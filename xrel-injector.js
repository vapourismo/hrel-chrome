/**
 * Mutate the release links, so they'll redirect to the HRel search.
 */
function mutateReleases(container) {
	const elems = container.querySelectorAll(".fav_entry_rls a");
	elems.forEach(function (elem) {
		if (elem.id)
			return;

		const name = elem.innerText.trim();

		elem.href = "http://dev.hrel.vprs.pw/search/" + name;
		elem.target = "blank";
	});
}

/**
 * Observe the container for changes.
 */
function observeContainer(container) {
	const observer = new MutationObserver(_ => mutateReleases(container));
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
		mutateReleases(container);
	}
}

// Observe body in order to catch the insertion of '#global_fav_container'.
const bodyObserver = new MutationObserver(findContainer);
bodyObserver.observe(document.body, {childList: true});

// Safety first, try to find the container, maybe it has been attached already.
findContainer();
