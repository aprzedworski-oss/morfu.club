
(function () {
  function getState(worldId) {
    try {
      return JSON.parse(localStorage.getItem("morfuWorld:" + worldId) || "{}");
    } catch (e) {
      return {};
    }
  }

  function setState(worldId, state) {
    localStorage.setItem("morfuWorld:" + worldId, JSON.stringify(state));
  }

  function renderWorld(root) {
    var worldId = root.getAttribute("data-world-id");
    var total = Number(root.getAttribute("data-mission-total") || 5);
    var state = getState(worldId);

    if (worldId === "coral-ocean" && localStorage.getItem("morfuMission001Complete") === "true") {
      state.completed = Array.from(new Set([].concat(state.completed || [], [1])));
      state.powerUnlocked = true;
      setState(worldId, state);
    }

    var completed = Array.isArray(state.completed) ? state.completed : [];
    var count = completed.length;
    var progress = Math.round((count / total) * 100);

    root.querySelectorAll("[data-world-progress-fill]").forEach(function (el) {
      el.style.width = progress + "%";
    });
    root.querySelectorAll("[data-world-progress-text]").forEach(function (el) {
      el.textContent = progress + "%";
    });
    root.querySelectorAll("[data-feather-count]").forEach(function (el) {
      el.textContent = count + " / " + total;
    });
    root.querySelectorAll("[data-mission-number]").forEach(function (card) {
      var n = Number(card.getAttribute("data-mission-number"));
      if (completed.indexOf(n) !== -1) {
        card.classList.add("mission-complete-v49");
        var status = card.querySelector("[data-mission-status]");
        if (status) status.textContent = "Completed";
      }
    });
  }

  document.querySelectorAll("[data-world-engine]").forEach(renderWorld);
})();
