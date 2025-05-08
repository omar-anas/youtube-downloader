const $button = document.querySelector('#get-video-info-btn');
const $input = document.querySelector('#videoURL');

$button.addEventListener('click', (e) => {
    if (!$input.value.trim()) {
        alert('Please enter a valid YouTube URL');
        return;
    }

    fetch(`/info?URL=${$input.value.trim()}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert(data.error);
                return;
            }

            let detailsNodes = {
                thumbnail: document.querySelector(".video-data .thumbnail img"),
                title: document.querySelector(".video-data .info h2"),
                description: document.querySelector(".video-data .info p"),
            }

            // Add null checks and fallbacks for all data
            if (detailsNodes.thumbnail) {
                detailsNodes.thumbnail.src = data.thumbnail?.url || '';
            }
            if (detailsNodes.title) {
                detailsNodes.title.innerText = data.title || 'Untitled';
            }
            if (detailsNodes.description) {
                detailsNodes.description.innerText = data.description || 'No description available';
            }

            document.querySelector('.footer').style.display = 'block';
            document.querySelector(".video-data").style.display = "block";
            document.querySelector(".video-data").scrollIntoView({
                behavior: "smooth"
            });

            const downloadBtn = document.querySelector("#download-btn");
            if (downloadBtn) {
                // Remove any existing event listeners
                const newBtn = downloadBtn.cloneNode(true);
                downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
                
                newBtn.addEventListener("click", () => {
                    let videoURL = $input.value.trim();
                    let title = data.title || 'download';
                    window.open(`/download?URL=${encodeURIComponent(videoURL)}&title=${encodeURIComponent(title)}`);
                });
            }
        }).catch(err => {
            console.error('Error parsing response:', err);
            alert('Failed to parse video information');
        });
    }).catch(err => {
        console.error('Error fetching video info:', err);
        alert('Failed to fetch video information');
    });
});


