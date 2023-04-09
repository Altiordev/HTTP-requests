const main = document.querySelector('.main'),
    form = document.querySelector('.form'),
    inputName = document.querySelector('.inputName'),
    inputMail = document.querySelector('.inputMail'),
    formBtn = document.querySelector('.formBtn'),
    editBtn = document.querySelector('.editBtn'),
    deleteBtn = document.querySelector('.deleteBtn'),
    modal = document.querySelector('.modal');

const api = 'https://reqres.in/api/users';

const inputUser = {
    firstName: inputName.value,
    email: inputMail.value
}

// main.addEventListener('click', (e) => {
//     console.log(e.target);
// })

async function getData() {
    modal.style.display = "flex"
    const response = await fetch(api);
    const data = await response.json();
    // console.log(data);

    data.data.map((user) => {
        console.log(user);
        modal.style.display = "none"

        const card = document.createElement('div');
        card.classList.add('card');

        const userName = document.createElement('input');
        userName.classList.add('userName');
        userName.setAttribute('disabled', '');
        userName.type = 'text'
        userName.value = user.first_name;

        const userEmail = document.createElement('input');
        userEmail.classList.add('userEmail');
        userEmail.setAttribute('disabled', '');
        userEmail.type = 'text'
        userEmail.value = user.email;

        const userPhoto = document.createElement('img');
        userPhoto.src = user.avatar;
        userPhoto.alt = 'user photo';

        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btnWrapper');

        const editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            userName.removeAttribute('disabled');
            userName.style.border = '0.5px solid black';
            userEmail.removeAttribute('disabled');
            userEmail.style.border = '0.5px solid black';
        })

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('saveBtn');
        saveBtn.textContent = 'Save';
        saveBtn.style.display = 'none';
        saveBtn.addEventListener('click', () => {
            modal.style.display = "flex"
            saveBtn.dataset.id = user.id;
            user.first_name = userName.value;
            user.email = userEmail.value;
            fetch(api + "/" + saveBtn.dataset.id, {
                method: "PUT"
            }).then((response) => {
                if (response.ok) {
                    user.first_name = userName.value;
                    user.email = userEmail.value;
                    console.log('changed', user);
                    userName.setAttribute('disabled', '');
                    userName.style.border = 'none';
                    userEmail.setAttribute('disabled', '');
                    userEmail.style.border = 'none';
                    saveBtn.style.display = 'none';
                    editBtn.style.display = 'block';
                    modal.style.display = "none"
                }
            }).catch(err => {
                console.error(err)
            });
        })
        userName.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                saveBtn.click();
            }
        });

        userEmail.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                saveBtn.click();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            modal.style.display = "flex"
            deleteBtn.dataset.id = user.id
            fetch(api + "/" + deleteBtn.dataset.id, {
                method: "DELETE"
            }).then((response) => {
                if (response.ok) {
                    console.log('removed');
                    main.removeChild(card);
                    modal.style.display = "none"
                }
            }).catch(err => {
                console.error(err)
            });
        })

        btnWrapper.append(editBtn, saveBtn, deleteBtn)

        card.append(userName, userEmail, userPhoto, btnWrapper);
        main.appendChild(card);

    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.style.display = "flex"

        inputUser.firstName = inputName.value;
        inputUser.email = inputMail.value;

        fetch(api, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(inputUser),
        }).then((response) => response.json()).then((user) => {
            modal.style.display = "none"

            const card = document.createElement('div');
            card.classList.add('card');

            const userName = document.createElement('input');
            userName.classList.add('userName');
            userName.setAttribute('disabled', '');
            userName.type = 'text'
            userName.value = user.firstName;

            const userEmail = document.createElement('input');
            userEmail.classList.add('userEmail');
            userEmail.setAttribute('disabled', '');
            userEmail.type = 'text'
            userEmail.value = user.email;

            const userPhoto = document.createElement('img');
            userPhoto.src = 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';
            userPhoto.alt = 'user photo';

            const btnWrapper = document.createElement('div');
            btnWrapper.classList.add('btnWrapper');

            const editBtn = document.createElement('button');
            editBtn.classList.add('editBtn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editBtn.style.display = 'none';
                saveBtn.style.display = 'block';
                userName.removeAttribute('disabled');
                userName.style.border = '0.5px solid black';
                userEmail.removeAttribute('disabled');
                userEmail.style.border = '0.5px solid black';
            })

            const saveBtn = document.createElement('button');
            saveBtn.classList.add('saveBtn');
            saveBtn.textContent = 'Save';
            saveBtn.style.display = 'none';
            saveBtn.addEventListener('click', () => {
                modal.style.display = "flex"
                saveBtn.dataset.id = user.id;
                user.firstName = userName.value;
                user.email = userEmail.value;
                fetch(api + "/" + saveBtn.dataset.id, {
                    method: "PUT"
                }).then((response) => {
                    if (response.ok) {
                        user.firstName = userName.value;
                        user.email = userEmail.value;
                        console.log('changed', user);
                        userName.setAttribute('disabled', '');
                        userName.style.border = 'none';
                        userEmail.setAttribute('disabled', '');
                        userEmail.style.border = 'none';
                        saveBtn.style.display = 'none';
                        editBtn.style.display = 'block';
                        modal.style.display = "none"
                    }
                }).catch(err => {
                    console.error(err)
                });
            })

            userName.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    saveBtn.click();
                }
            });

            userEmail.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    saveBtn.click();
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', () => {
                modal.style.display = "flex"
                deleteBtn.dataset.id = user.id
                fetch(api + "/" + deleteBtn.dataset.id, {
                    method: "DELETE"
                }).then((response) => {
                    if (response.ok) {
                        console.log('removed');
                        main.removeChild(card);
                        modal.style.display = "none"
                    }
                }).catch(err => {
                    console.error(err)
                });
            })

            btnWrapper.append(editBtn, saveBtn, deleteBtn)

            card.append(userName, userEmail, userPhoto, btnWrapper);
            main.appendChild(card);

            console.log(user);
        });

        form.reset();
    })

}

getData();