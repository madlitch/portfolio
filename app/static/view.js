const src = "/static/images/";

async function switch_tab(tab) {
    if (tab === 'about') {
        document.getElementById('about').style.width = '100%';
        document.getElementById('projects').style.width = '0';
        document.getElementById('nav-about').classList.add('transparent-background');
        document.getElementById('nav-projects').classList.remove('transparent-background');
    } else {
        document.getElementById('about').style.width = '0';
        document.getElementById('projects').style.width = '100%';
        document.getElementById('nav-about').classList.remove('transparent-background');
        document.getElementById('nav-projects').classList.add('transparent-background');
    }
}

async function switch_projects(tag) {
    const underline_highlights = document.getElementsByClassName('underline-highlight');
    const projects = document.getElementsByClassName('project');

    for (let el of projects) {
        if (!el.classList.contains(tag) && tag !== 'all') {
            el.classList.add('d-none');
        } else {
            el.classList.remove('d-none');
        }
    }

    for (let el of underline_highlights) {
        el.style.width = '0';
    }

    if (tag === 'all') {
        underline_highlights[0].style.width = '100%';
    } else if (tag === 'current') {
        underline_highlights[1].style.width = '100%';
    } else if (tag === 'highlight') {
        underline_highlights[2].style.width = '100%';
    } else if (tag === 'school') {
        underline_highlights[3].style.width = '100%';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}