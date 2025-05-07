const $button = document.querySelector('#get-video-info-btn');
const $input  =  document.querySelector('#videoURL');

$button.addEventListener('click',(e)=>{
    

    
    fetch(`/info?URL=${$input.value.trim()}`).then((response) =>{
        response.json().then((data)=>{
            console.log(data);
            

            let detailsNodes = {
                thumbnail:document.querySelector(".video-data .thumbnail img"),
                title:document.querySelector(".video-data .info h2"),
                description:document.querySelector(".video-data .info p"),
            }
				
					detailsNodes.thumbnail.src = data.thumbnail.url; // get HD thumbnail img
					detailsNodes.title.innerText = data.title;
					detailsNodes.description.innerText = data.description;

					
                    document.querySelector('.footer').style.display = 'block';
					document.querySelector(".video-data").style.display = "block";
					document.querySelector(".video-data").scrollIntoView({
						behavior:"smooth"
					});

                    document.querySelector("#download-btn").addEventListener("click",()=>{
                        let videoURL = $input.value.trim();
                        let title = detailsNodes.title.innerText
                        window.open(`/download?URL=${videoURL}&title=${title}`);
                    });
        })
    })


    


    

});


