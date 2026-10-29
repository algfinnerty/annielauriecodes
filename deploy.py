#!/usr/bin/env python3
"""Upload the static site files in this directory to an S3 bucket."""

from __future__ import annotations

import argparse
import json
import mimetypes
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
CONFIG_PATH = ROOT / "deploy_config.json"
ALLOWED_SUFFIXES = {
    ".avif", ".cjs", ".css", ".eot", ".gif", ".html", ".ico", ".jpeg",
    ".jpg", ".js", ".json", ".mjs", ".otf", ".pdf", ".png", ".svg",
    ".txt", ".ttf", ".webmanifest", ".webp", ".woff", ".woff2", ".xml",
}
EXCLUDED_NAMES = {
    ".gitignore", "deploy.py", "deploy_config.json", "deploy_config.example.json",
    "requirements.txt", "deploying.md",
}


def load_config() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        raise ValueError(
            f"Missing {CONFIG_PATH.name}. Copy deploy_config.example.json to "
            f"{CONFIG_PATH.name}, then enter your bucket name and region."
        )

    try:
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON in {CONFIG_PATH.name}: {error}") from error

    if not isinstance(config, dict):
        raise ValueError(f"{CONFIG_PATH.name} must contain a JSON object.")

    bucket = config.get("bucket")
    if not isinstance(bucket, str) or not bucket.strip():
        raise ValueError('Set a non-empty "bucket" value in deploy_config.json.')
    if bucket.strip() == "REPLACE_WITH_YOUR_BUCKET_NAME":
        raise ValueError('Replace the example "bucket" value in deploy_config.json.')

    region = config.get("region", "us-east-1")
    prefix = config.get("prefix", "")
    if not isinstance(region, str) or not region.strip():
        raise ValueError('The "region" value must be a non-empty string.')
    if not isinstance(prefix, str):
        raise ValueError('The "prefix" value must be a string.')

    return {"bucket": bucket.strip(), "region": region.strip(), "prefix": prefix.strip("/")}


def collect_site_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.is_symlink():
            continue

        relative_path = path.relative_to(ROOT)
        if any(part.startswith(".") for part in relative_path.parts):
            continue
        if path.name.lower() in EXCLUDED_NAMES:
            continue
        if path.suffix.lower() not in ALLOWED_SUFFIXES:
            continue
        files.append(path)

    return sorted(files, key=lambda path: path.relative_to(ROOT).as_posix().lower())


def cache_control_for(path: Path) -> str:
    if path.suffix.lower() in {".html"}:
        return "no-cache"
    return "public, max-age=3600"


def upload_files(config: dict[str, Any], files: list[Path], dry_run: bool) -> None:
    bucket = config["bucket"]
    prefix = config["prefix"]

    if dry_run:
        for path in files:
            relative_path = path.relative_to(ROOT).as_posix()
            key = f"{prefix}/{relative_path}" if prefix else relative_path
            print(f"Would upload {relative_path} -> s3://{bucket}/{key}")
        print(f"Dry run complete: {len(files)} file(s) found; nothing uploaded.")
        return

    try:
        import boto3
        from botocore.exceptions import BotoCoreError, ClientError
    except ImportError as error:
        raise RuntimeError(
            "boto3 is not installed. Install the project requirements first."
        ) from error

    client = boto3.client("s3", region_name=config["region"])
    for path in files:
        relative_path = path.relative_to(ROOT).as_posix()
        key = f"{prefix}/{relative_path}" if prefix else relative_path
        content_type, _ = mimetypes.guess_type(path.name)
        extra_args = {
            "ContentType": content_type or "application/octet-stream",
            "CacheControl": cache_control_for(path),
        }
        try:
            client.upload_file(str(path), bucket, key, ExtraArgs=extra_args)
        except (BotoCoreError, ClientError) as error:
            raise RuntimeError(f"Upload failed for {relative_path}: {error}") from error
        print(f"Uploaded {relative_path} -> s3://{bucket}/{key}")

    print(f"Upload complete: {len(files)} file(s) sent to s3://{bucket}/")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="List the site files and S3 keys without uploading or requiring boto3.",
    )
    args = parser.parse_args()

    try:
        config = load_config()
        files = collect_site_files()
        if not files:
            raise ValueError("No supported static site files were found to upload.")
        upload_files(config, files, args.dry_run)
    except (OSError, ValueError, RuntimeError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
