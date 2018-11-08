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
            <div clas="comments">
            <p>${this.showComments(photo.comments,index)}</p>
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

        return comments[0] + '</br> <button id="moreComents' + index + '">Mostra más cometarios</buttom>'
       // document.getElementById(`moreComents${index}`).addEventListener('click', () => this.likePhoto(this.photos[count]))

        
        // return  buttonCommets

        // if(comments.length > 0){
        //     return comments[0]
        // }
        // return comments.map(comment => comment).join('</br>')
    }

    clickComments()
    {
        console.log('mostrar más')
    }

    formatData(data)
    {
        var ES = new Intl.DateTimeFormat("es-ES")
        return ES.format(new Date(data));
    }

    addEvents(){
        for (let count = 0; count < this.photos.length; count++) {
           document.getElementById(`likeBtn${count}`).addEventListener('click', () => this.likePhoto(this.photos[count]))
        //    document.getElementById(`moreComents${count}`).addEventListener('click', () => this.clickComments())
        }
    }

    likePhoto(photoToChange) {
            this.photos = this.photos.map(photo => {
                if(photoToChange.photoURI === photo.photoURI) 
                {
                    if(photoToChange.liked === false ){
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

