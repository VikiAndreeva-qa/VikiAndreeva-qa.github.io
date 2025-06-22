document.addEventListener('DOMContentLoaded', function() {
    const boneBtn = document.getElementById('bone-btn');
    const pigeonBtn = document.getElementById('pigeon-btn');
    const bone = document.getElementById('bone');
    const pigeon = document.getElementById('pigeon');
    const petPhoto = document.getElementById('pet-photo');
    const submitBtn = document.getElementById('submit-message');
    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');
    const messagesContainer = document.getElementById('messages-container');

    function animateItem(item, startX, startY, targetX, targetY, duration) {
        item.style.left = startX + 'px';
        item.style.top = startY + 'px';
        item.style.display = 'block';
        
        const startTime = Date.now();
        let rotation = 0;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const x = startX + (targetX - startX) * progress;
            const y = startY + (targetY - startY) * progress - 
                     50 * Math.sin(progress * Math.PI);
            
            rotation += 5;
            
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            item.style.transform = `rotate(${rotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                item.style.display = 'none';
                if (item === bone) {
                    petPhoto.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        petPhoto.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }

    boneBtn.addEventListener('click', function() {
        const btnRect = boneBtn.getBoundingClientRect();
        const petRect = petPhoto.getBoundingClientRect();
        
        animateItem(
            bone,
            btnRect.left + btnRect.width/2 - 50,
            btnRect.top - 50,
            petRect.left + petRect.width/2 - 50,
            petRect.top + petRect.height/2 - 50,
            1500
        );
    });

    pigeonBtn.addEventListener('click', function() {
        const btnRect = pigeonBtn.getBoundingClientRect();
        const petRect = petPhoto.getBoundingClientRect();
animateItem(
    pigeon,
    btnRect.left + btnRect.width / 2 - 50,
    btnRect.top - 50,
    petRect.left + petRect.width / 2 - 50,
    petRect.top + petRect.height / 2 - 50,
    1500
);
    });

    submitBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
            addMessage(name, message);
            nameInput.value = '';
            messageInput.value = '';
        } else {
            alert('Пожалуйста, заполни все поля!');
        }
    });

    function addMessage(name, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const authorDiv = document.createElement('div');
        authorDiv.className = 'message-author';
        authorDiv.textContent = name;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        messageDiv.appendChild(authorDiv);
        messageDiv.appendChild(textDiv);
        
        messagesContainer.prepend(messageDiv);
    }
});
