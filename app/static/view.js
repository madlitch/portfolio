const src = "/static/images/";

function checkPathAndSwitchTab() {
    const path = window.location.pathname;
    const tab = path.split('/')[1]; // Assuming URL structure is like site.com/tabName
    switchTab(tab);
}

function switchTab(tab) {
    if (tab === "") {
        tab = "home";
    }
    const tabs = document.querySelectorAll('.tab');
    const navtabs = document.querySelectorAll('.nav-tab');

    tabs.forEach((tab) => {
        tab.style.height = '0';
    });
    navtabs.forEach((navtab) => {
        navtab.classList.remove('transparent-background');
    });

    if (history.state === null || history.state.tab !== tab) {
        history.pushState({tab: tab}, '', '/' + tab);
    }

    document.getElementById(tab).style.height = '100%';
    document.getElementById('nav-' + tab).classList.add('transparent-background');
}

window.onpopstate = function (event) {
    if (event.state && event.state.tab) {
        switchTab(event.state.tab);
    }
};

async function switchProjects(tag, button) {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
    document.querySelectorAll('.nav-item').forEach(function(element) {
        element.addEventListener('click', function(e) {
            const navbarToggler = document.getElementById('navbar-toggler');
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                if (document.querySelector('.navbar-collapse').classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
}


// let isThrottled = false;
// const throttleDuration = 700; // Adjust the duration based on sensitivity preference
//
// function throttleChangeTab(direction) {
//     if (!isThrottled) {
//         isThrottled = true;
//         changeTabOnScroll(direction);
//
//         setTimeout(() => {
//             isThrottled = false;
//         }, throttleDuration);
//     }
// }
//
//
//
// // let lastScrollPosition = 0;

// window.addEventListener('wheel', (event) => {
//     const direction = event.deltaY < 0 ? 'up' : 'down';
//     throttleChangeTab(direction);
// });

// const tabs = ['home', 'about', 'projects']; // Ensure this matches the order of your tabs
// let currentTabIndex = 0; // Start with the first tab
//
// function changeTabOnScroll(direction) {
//     if (direction === 'down') {
//         currentTabIndex = Math.min(currentTabIndex + 1, tabs.length - 1);
//     } else if (direction === 'up') {
//         currentTabIndex = Math.max(currentTabIndex - 1, 0);
//     }
//     switchTab(tabs[currentTabIndex]);
// }

// let accumulatedScrollY = 0;
// const scrollThreshold = 600; // Adjust based on sensitivity preference
//
// function accumulateScrollDistance(deltaY) {
//     accumulatedScrollY += deltaY;
//
//     if (Math.abs(accumulatedScrollY) > scrollThreshold) {
//         const direction = accumulatedScrollY < 0 ? 'up' : 'down';
//         changeTabOnScroll(direction);
//         // Reset accumulated scroll after switching tabs
//         accumulatedScrollY = 0;
//     }
// }
//
// document.querySelector('.scroll-container').addEventListener('wheel', (event) => {
//     // Use event.deltaY for wheel scroll distance
//     accumulateScrollDistance(event.deltaY);
// });
//
// let touchStartY = 0;
// let touchEndY = 0;
//
// window.addEventListener('touchstart', (event) => {
//     touchStartY = event.touches[0].clientY;
// }, false);
//
// window.addEventListener('touchend', (event) => {
//     // Calculate the vertical distance moved
//     let deltaY = touchStartY - touchEndY;
//     accumulateScrollDistance(deltaY);
//     // Reset touchEndY for the next touch sequence
//     touchEndY = 0;
// }, false);
//
// window.addEventListener('touchmove', (event) => {
//     touchEndY = event.changedTouches[0].clientY;
// }, false);
