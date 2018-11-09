import axios from 'axios'

class Vistagram {

    constructor() {
        this.photos = this.getPhotos().then(photos => {
            this.photos = photos
            this.render()
        })
    }

    getPhotos()
    {
        return axios(`http://www.mocky.io/v2/5be1526e3000004c00d9a8c6`)
        .then(function(response) {
            return response.data
        }).catch(function(response) {
            return response.response.status
        })
    }

    render() {
        let photosHtml = this.photos.map( (photo,index) => {
            return `<div class="photo" id="photo${index}">
            <div class="username"><p>${photo.username}</p></div>
            <div class="photoURI"><img src="${photo.photoURI}" alt=""></div> 
            <div class="like">
            <ul>
            <li><button id="likeBtn${index}"><img src="img/like${photo.liked}.jpg" alt="Liked"></button></li>
            <li>Me gustan ${photo.likes.toLocaleString('es')}</li>
            </ul>
            </div>
            <div class="comments">
            ${this.showComments(photo.comments,index)}
            </div>  
            <div class="date"><p>${this.formatData(photo.date)}</p></div>
            </div>`
        }).join('')
        document.getElementById('container').innerHTML = photosHtml

        this.addEvents()
    }

    showComments(comments,index)
    {
        if(comments.length === 0) return 'No tiene comentarios'     

        let yesComments = `<p class="contComments collapsed" id="contComments${index}">${comments.map(comment => comment).join('</br>')}</p><p><button id="moreComments${index}" class="BtnMoreComments">Cargar más cometarios</buttom></p>`

        let noComments = `<p class="contComments">${comments} </br><span class="noMoreComments">No tienen más comentarios</span></p>`

        return (comments.length >= 2 ? yesComments : noComments) 
        // return comments.map(comment => comment).join('</br>')
    }

    clickComments(count)
    {
        document.getElementById(`contComments${count}`).classList.toggle('collapsed');
    }

    formatData(data)
    {
        let ES = new Intl.DateTimeFormat("es-ES")
        return ES.format(new Date(data));
    }

    addEvents(){
        for (let count = 0; count < this.photos.length; count++) {
           document.getElementById(`likeBtn${count}`).addEventListener('click', () => this.likePhoto(this.photos[count]))
           if(this.photos[count].comments.length >= 2) document.getElementById(`moreComments${count}`).addEventListener('click', () => this.clickComments(count))
        }
    }

    likePhoto(photoToChange) {
            this.photos = this.photos.map(photo => {
                if(photoToChange.photoURI === photo.photoURI) 
                {
                    if(!photoToChange.liked){
                        photo.liked = true
                        photo.likes++   
                    }
                    else{
                        photo.liked = false
                        photo.likes--
                    }
                }
                return photo
            })
            this.render()
        
    }            
}

export default new Vistagram()

