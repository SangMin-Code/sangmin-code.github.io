'use strict';

const body = document.body;
const navBar = document.querySelector('#navbar');
const navBarRect = navBar.getBoundingClientRect();
const home = document.querySelector('#home');
const homeRect = home.getBoundingClientRect();

// transparent NavBar when it on the top,
// transparent HomeContents when it on some scroll
// scroll to top when arrowbtn clicked
document.addEventListener('scroll', (e) => {
	scrollHome();
	scrollNavbar();
	scrollArrow();
});

// When navbarMenu cilicked scroll to each menu section
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
	const target = e.target;
	if (target.classList.contains('navbar__menu__item')) {
		removeActive('navbar__menu__item');
		target.classList.add('active');
		const section = target.dataset.section;
		scrollIntoView(section);
	}
});

function scrollNavbar() {
	if (window.scrollY > navBarRect.height) {
		body.classList.add('scroll');
		navBar.classList.add('onscroll');
	} else {
		body.classList.remove('scroll');
		navBar.classList.remove('onscroll');
	}
}

//When Home ContactBtn clicked scroll to contact section
const contactBtn = document.querySelector('.home_btn');
contactBtn.addEventListener('click', (e) => {
	scrollIntoView('#contact');
});

function scrollHome() {
	const homeContainer = document.querySelector('.home__container');
	const homeContainerRect = homeContainer.getBoundingClientRect();
	const homeContainerHeight = homeContainerRect.height;
	homeContainer.style.opacity = 1 - window.scrollY / homeContainerHeight;
}

// When Arrow btn Click, scroll to top
const arrow = document.querySelector('.arrow');

arrow.addEventListener('click', (e) => {
	scrollIntoView('#home');
});

function scrollArrow() {
	if (window.scrollY > homeRect.height / 2) {
		arrow.classList.add('visible');
	} else {
		arrow.classList.remove('visible');
	}
}

// util
// ScrollInto selector
function scrollIntoView(selector) {
	const section = document.querySelector(selector);
	section.scrollIntoView({ behavior: 'smooth' });
}
//removeActive Class in elements that have same className
function removeActive(className) {
	const elements = document.querySelectorAll(`.${className}`);
	elements.forEach((element) => {
		if (element.classList.contains('active')) {
			element.classList.remove('active');
		}
	});
}

//when works button clicked, reorder project list
const category = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
category.addEventListener('click', (e) => {
	const target = e.target;
	const filter = target.dataset.filter || target.parentNode.dataset.filter;

	if (
		filter == null ||
		target.classList.contains('active') ||
		target.parentNode.classList.contains('active')
	) {
		return;
	}

	removeActive('category__btn');
	if (target.dataset.filter) {
		target.classList.add('active');
	} else if (target.parentNode.dataset.filter) {
		target.parentNode.classList.add('active');
	}

	const projects = document.querySelectorAll('.project');

	projectContainer.classList.add('invisible');

	setTimeout(() => {
		projects.forEach((project) => {
			if (filter === '*' || project.dataset.type === filter) {
				project.classList.remove('invisible');
			} else {
				project.classList.add('invisible');
			}
		});
		projectContainer.classList.remove('invisible');
	}, 300);
});

//click navbar__toggle-btn, show nav menu

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
const navbarContainer = document.querySelector('.navbar__menu__container');

navbarToggleBtn.addEventListener('click', () => {
	if (!navBar.classList.contains('onscroll')) {
		navBar.classList.add('onscroll');
	}

	navbarContainer.classList.toggle('visible');
	navbarMenu.classList.toggle('visible');
});
