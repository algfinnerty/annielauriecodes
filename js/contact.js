const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('#form-status');
const lambdaEndpoint = window.AWS_LAMBDA_ENDPOINT || 'https://example.execute-api.us-east-1.amazonaws.com/default/contact-form';

function setFormStatusMessage(message, isError = false) {
	if (!formStatus) return;
	formStatus.textContent = message;
	formStatus.classList.toggle('is-error', Boolean(isError));
	formStatus.classList.toggle('is-success', !isError && Boolean(message));
}

function validateContactForm() {
	if (!contactForm) return false;

	const requiredFields = Array.from(contactForm.querySelectorAll('input[required], textarea[required]'));
	let isValid = true;
	let firstInvalidField = null;

	requiredFields.forEach((field) => {
		const hasValue = field.value.trim().length > 0;
		const shouldMarkInvalid = !hasValue;
		field.classList.toggle('is-invalid', shouldMarkInvalid);
		field.setAttribute('aria-invalid', String(shouldMarkInvalid));

		if (shouldMarkInvalid) {
			isValid = false;
			firstInvalidField ??= field;
		}
	});

	const sendButton = contactForm.querySelector('.send-button');
	if (sendButton) {
		sendButton.disabled = !isValid;
	}

	if (!isValid) {
		setFormStatusMessage('Please complete the highlighted fields before sending.', true);
		if (firstInvalidField) firstInvalidField.focus();
		return false;
	}

	setFormStatusMessage('');
	return true;
}

function validateFormFields() {
	return validateContactForm();
}

async function sendContactFormToLambda(formData) {
	if (!formData || Object.keys(formData).length === 0) {
		throw new Error('No form data to send.');
	}

	const response = await fetch(lambdaEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText || `Request failed with status ${response.status}.`);
	}

	return response;
}

function sendToLambda(formData) {
	return sendContactFormToLambda(formData);
}

if (contactForm && formStatus) {
	const requiredFields = Array.from(contactForm.querySelectorAll('input[required], textarea[required]'));
	requiredFields.forEach((field) => {
		field.addEventListener('blur', validateContactForm);
		field.addEventListener('input', () => {
			if (field.value.trim()) {
				field.classList.remove('is-invalid');
				field.setAttribute('aria-invalid', 'false');
				if (Array.from(contactForm.querySelectorAll('input[required], textarea[required]')).every((item) => item.value.trim().length > 0)) {
					const sendButton = contactForm.querySelector('.send-button');
					if (sendButton) sendButton.disabled = false;
					setFormStatusMessage('');
				}
			}
		});
	});

	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		if (!validateContactForm()) {
			return;
		}

		const formData = Object.fromEntries(new FormData(contactForm).entries());
		const sendButton = contactForm.querySelector('.send-button');
		if (sendButton) sendButton.disabled = true;
		setFormStatusMessage('Sending your message...', false);

		try {
			await sendContactFormToLambda(formData);
			setFormStatusMessage('Your message was sent successfully.', false);
			contactForm.reset();
			validateContactForm();
		} catch (error) {
			setFormStatusMessage(error.message || 'Something went wrong while sending your message.', true);
			if (sendButton) sendButton.disabled = false;
		}
	});
}
