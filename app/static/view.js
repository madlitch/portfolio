const src = "/static/images/";

function checkPathAndSwitchTab() {
    const path = window.location.pathname;
    const tab = path.split('/')[1];
    selectTab(tab);
}

function switchTab(tab) {
    if (tab === "") {
        tab = "home";
    }
    const navtabs = document.querySelectorAll('.nav-tab');

    navtabs.forEach((navtab) => {
        navtab.classList.remove('transparent-background');
    });

    if (history.state === null || history.state.tab !== tab) {
        history.pushState({tab: tab}, '', '/' + tab);
    }

    document.getElementById('nav-' + tab).classList.add('transparent-background');
}

function selectTab(tab) {
    if (tab === "") {
        tab = "home";
    }
    document.getElementById(tab).scrollIntoView({behavior: "smooth", block: "start"});
}

window.onpopstate = function (event) {
    if (event.state && event.state.tab) {
        switchTab(event.state.tab);
    }
};

async function switchWorkFilter(tag, button) {
    const underline_highlights = document.getElementsByClassName('underline-highlight');
    const projects = document.getElementsByClassName('project');

    let first_project = true;

    for (let i = projects.length - 1; i >= 0; i--) {
        let project = projects[i];

        project.children[1].classList.remove('invisible')

        if (!project.classList.contains(tag) && tag !== 'all') {
            project.classList.add('d-none');
        } else {
            if (first_project) {
                project.children[1].classList.add('invisible')
                first_project = false;
            }
            project.classList.remove('d-none');
        }
    }

    for (let el of underline_highlights) {
        el.style.width = '0';
        if (el.classList.contains(tag)) {
            el.style.width = '100%'
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    function intersectionCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                switchTab(entry.target.parentNode.id);
            }
        });
    }

    const viewportHeight = window.innerHeight;
    const halfViewportHeight = Math.round(viewportHeight / 2);
    const rootMarginValue = `-${halfViewportHeight}px 0px`;

    const options = {
        root: null,
        rootMargin: `${rootMarginValue} 0px 0px`, // Adjusted dynamically
        threshold: 0.01 // Detect even minor intersections
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    document.querySelectorAll('.tab .sentinel').forEach(sentinel => {
        observer.observe(sentinel);
    });
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
    document.querySelectorAll('.nav-item').forEach(function (element) {
        element.addEventListener('click', function (e) {
            const navbarToggler = document.getElementById('navbar-toggler');
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                if (document.querySelector('.navbar-collapse').classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
}