/**
 * Mutate the release links, so they'll redirect to the HRel search.
 */
function mutateFavReleases(container) {
	const elems = container.querySelectorAll(".fav_entry_rls a");
	elems.forEach(function (elem) {
		if (elem.id)
			return;

		const name = elem.innerText.trim();

		elem.href = "http://dev.hrel.vprs.pw/search/" + encodeURIComponent(name);
		elem.target = "blank";
	});
}

/**
 * Observe the container for changes.
 */
function observeContainer(container) {
	const observer = new MutationObserver(_ => mutateFavReleases(container));
	observer.observe(container, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ['style']
	});
}

/**
 * Find the container for the favourite lists.
 */
function findContainer() {
	const container = document.querySelector("#global_fav_container");

	if (container) {
		observeContainer(container);
		mutateFavReleases(container);
	}
}

/**
 * Find release links and redirect them to HRel.
 */
function mutateReleases() {
	function mut(elem) {
		const name = elem.querySelector("span").innerText.trim();

		elem.href = "http://dev.hrel.vprs.pw/search/" + encodeURIComponent(name);
		elem.target = "blank";
	}

	const elems = document.querySelectorAll(".release_title a.sub_link");
	elems.forEach(mut);

	const elemsTips = document.querySelectorAll(".prototip a.sub_link");
	elemsTips.forEach(mut);
}

/**
 * Run mutators.
 */
function run() {
	findContainer();
	mutateReleases();
}

// Observe body in order to catch the insertion of '#global_fav_container'.
const bodyObserver = new MutationObserver(run);
bodyObserver.observe(document.body, {childList: true});

// Register "load" hook just for safety
window.addEventListener("load", run);

// Safety first
run();
