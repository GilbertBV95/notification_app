document.getElementById('configForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	const server = document.getElementById('serverInput').value;
	const port = document.getElementById('portInput').value;
	const serverError = document.getElementById('serverError');
	const portError = document.getElementById('portError');
	const btn = document.getElementById('btn-submit');

	const numberRegEx = /[0-9]+/
	btn.classList.add('is-loading');
	btn.disabled = true;

	let error, changed;

	if (!server || !port) error = true;
	else error = false;

	if (!server) serverError.classList.remove('hidden');
	else serverError.classList.add('hidden');


	if (!port || !numberRegEx.test(port)) portError.classList.remove('hidden');
	else portError.classList.add('hidden');

	if (error) removeStates(btn);

	if (server && port) {
		changed = await window.updateConfig.setConfig({ server, port });

		if (changed) removeStates(btn);
	}
});

const removeStates = (btn) => {
	btn.classList.remove('is-loading');
	btn.disabled = false;
}