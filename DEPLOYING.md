# Deploying the static site to S3

1. Install Python 3 and the uploader dependency: `python -m pip install -r requirements.txt`.
2. Update the ignored `deploy_config.json` with your S3 bucket name, bucket region, and optional object prefix. Keep this file private; `.gitignore` excludes it. The checked-in `deploy_config.example.json` is only a template.
3. Configure AWS credentials outside this repository using an AWS profile, environment/credential provider, or an attached IAM role. Grant that identity `s3:PutObject` access to the target bucket/prefix (and `s3:AbortMultipartUpload` if larger files will be uploaded). Do not put AWS access keys in the config file.
4. Preview what will be sent: `python deploy.py --dry-run`.
5. Upload: `python deploy.py`.

The script uploads supported static site assets, sets their content types, and does not delete objects from the bucket. It deliberately skips hidden files, Python files, the deployment config, and project/deployment metadata. Configure S3 website hosting or a CDN, bucket access, and DNS independently; the script only uploads files and does not change AWS settings.
