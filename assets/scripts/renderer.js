document.getElementById('configForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	const server = document.getElementById('serverInput').value;
	const port = document.getElementById('portInput').value;
	const serverError = document.getElementById('serverError');
	const portError = document.getElementById('portError');
	const bnt = document.getElementById('btn-submit');

	const numberRegEx = /[0-9]+/

	if (!server) serverError.classList.remove('hidden');
	else serverError.classList.add('hidden');


	if (!port || !numberRegEx.test(port)) portError.classList.remove('hidden');
	else portError.classList.add('hidden');

	if (server && port) {
		const changed = await window.updateConfig.setConfig({ server, port });
		bnt.classList.add('is-loading');
		bnt.diabled = true;

		if (changed)
			bnt.classList.remove('is-loading');

		bnt.diabled = false;
	}
});