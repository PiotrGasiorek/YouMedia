
let projects;
window.addEventListener("load", () => {
    
    let nav = document.querySelectorAll('.btn--toggle'); 

    projects = {
        allGroups: document.querySelectorAll('.graphic, .movie, .photo, .website'),

        manageGroups(group) {
            this.hideAll();

            switch (group) {
                case 'web':
                    document.querySelectorAll('.website').forEach(el => {
                        this.show(el);
                    });
                    break;
                case 'graphic':
                    document.querySelectorAll('.graphic').forEach(el => {
                        this.show(el);
                    });
                    break;
                case 'videoAndPhoto':
                    document.querySelectorAll('.movie, .photo').forEach(el => {
                        this.show(el);
                    });
                    break;
                case 'photo':
                    document.querySelectorAll('.photo').forEach(el => {
                        this.show(el);
                    });
                    break;
                case 'all':
                    document.querySelectorAll('.graphic, .movie, .photo, .website').forEach(el => {
                        this.show(el);
                    });
                    break;

            }
        },

        hide(el) {
            el.style.display = 'none';
        },

        show(el) {
            if(el.classList.contains("website")){
                el.style.display = 'flex';
            } else{
                el.style.display = 'block';
            }
        },

        hideAll() {
            document.querySelectorAll('.graphic, .movie, .photo, .website').forEach(el => {
                this.hide(el);
            });
        }
    }

    // Event listeners for nav btns

    nav[0].addEventListener('click', (e) => {
        projects.manageGroups('web', e.target);
    });

    nav[1].addEventListener('click', (e) => {
        projects.manageGroups('graphic', e.target);
    });

    nav[2].addEventListener('click', (e) => {
        projects.manageGroups('videoAndPhoto', e.target);
    });

    nav[3].addEventListener('click', (e) => {
        projects.manageGroups('all', e.target);
    });

    nav.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.portfolio').scrollIntoView({
                behavior: 'smooth',
                inline: 'start'
            })
        })
    })
});
