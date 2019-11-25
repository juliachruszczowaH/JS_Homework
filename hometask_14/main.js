var body = document.getElementsByTagName('body')[0],
    button = document.getElementsByClassName('primary_button')[0],
    loader = document.getElementsByClassName('loader')[0];


button
    .addEventListener('click', function () {
        var userCards = document.getElementsByClassName('users_container'),
            warnings = document.getElementsByClassName('warning');
        if (userCards.length > 0) {
            userCards[0].remove();
        }
        if (warnings.length > 0) {
            warnings[0].remove();
        }

        loader.classList.remove('hidden');

        getUserList();
    }, false);


function getUserList() {
    var xhr = new XMLHttpRequest(),
        warnings = document.getElementsByClassName('warning');

    xhr.open('GET', 'https://reqres.in/api/users?page=2', true);

    xhr.send();

    xhr.onerror = function () {
        loader.classList.add('hidden');
        if (warnings.length == 0) {
            createWarningPane();
        }
    };

    xhr.onloadend = function () {
        try {
            var data = JSON.parse(this.response).data;
        } catch (e) {
            console.log('No data received');
        }

        loader.classList.add('hidden');

        if (String(this.status)[0] == 2 && data.length > 0) {
            var i = 1;
            localStorage.clear();
            data.forEach(function (item) {
                localStorage.setItem(`user${i}`, JSON.stringify(item));
                ++i;
            });

            createTabs(i - 1);

            document.getElementsByClassName('users_container')[0].appendChild(
                createPane(data[0]['avatar'], data[0]['first_name'], data[0]['last_name'], data[0]['email']));

        } else {
            if (warnings.length == 0) {
                createWarningPane();
            }
        }
    }

}

function createTabs(num) {
    var container = body.appendChild(document.createElement('div')),
        nav = container.appendChild(document.createElement('div'));

    container.classList.add('users_container');
    nav.className = 'tabs';

    for (var i = 1; i <= num; ++i) {
        var tab = nav.appendChild(document.createElement('button'));

        tab.setAttribute(`id`, `${i}`);
        tab.classList.add('tablink');
        (i === 1) ? tab.classList.add('active') : tab.classList.add('not-active');
        tab.innerText = `User${i}`;
    }

    nav.addEventListener('click', function (e) {
        var target = e.target,
            key = target.innerText.toLowerCase(),
            avatar = JSON.parse(localStorage.getItem(key))['avatar'],
            firstN = JSON.parse(localStorage.getItem(key))['first_name'],
            lastN = JSON.parse(localStorage.getItem(key))['last_name'],
            mail = JSON.parse(localStorage.getItem(key))['email'];

        updateActiveTab(target);

        updatePane(avatar, firstN, lastN, mail);
    }, false);

}

function createPane(img, firstName, lastName, mail) {
    var pane = body.appendChild(document.createElement('div')),
        image = pane.appendChild(document.createElement('img')),
        article = pane.appendChild(document.createElement('article')),
        fName = article.appendChild(document.createElement('p')),
        lName = article.appendChild(document.createElement('p')),
        email = article.appendChild(document.createElement('a'));

    pane.classList.add('profile');
    image.setAttribute('src', img);
    fName.innerText = `First Name: ${firstName}`;
    fName.classList.add('first_name');
    lName.innerText = `Last Name: ${lastName}`;
    lName.classList.add('last_name');
    email.innerText = `${mail}`;
    email.setAttribute('href', `mailto: ${mail}`);

    return pane;
}

function updatePane(img, firstName, lastName, mail) {
    document.getElementsByTagName('img')[0].setAttribute('src', img);
    document.getElementsByClassName('first_name')[0].innerText = `First Name: ${firstName}`;
    document.getElementsByClassName('last_name')[0].innerText = `Last Name: ${lastName}`;
    document.getElementsByTagName('a')[0].innerText = `${mail}`;
    document.getElementsByTagName('a')[0].setAttribute('href', `mailto: ${mail}`);
}

function createWarningPane() {
    var pane = body.appendChild(document.createElement('div'));
    pane.classList.add('warning');
    pane.innerText = 'Something went wrong';
    return pane;

}

function updateActiveTab(item) {
    var activeTab = document.getElementsByClassName('active')[0];
    activeTab.classList.remove('active');
    activeTab.classList.add('not-active');
    item.classList.remove('not-active');
    item.classList.add('active');
}

