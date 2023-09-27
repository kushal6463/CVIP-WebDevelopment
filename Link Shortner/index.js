async function shortenUrl() {
    const url = document.getElementById('shortner').value;
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    output = document.getElementById('output')
    if (response.ok) {
        const data = await response.text();
        output.innerHTML = `
        <strong>Shortened URL :</strong>  <a href="${data}" target="_blank">${data}</a>`;
    } else {
        setTimeout(function () {
            output.innerHTML = `
        <strong>Please Enter a valid Link</strong>`;
        }, 2500);

    }
}
