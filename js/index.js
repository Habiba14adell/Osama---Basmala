function openInvitation() {
  window.location.href = "invitation.html";
}

function initEntrance() {
  const entrance = document.querySelector(".entrance");

  if (!entrance) return;

  entrance.addEventListener("click", openInvitation);
}

document.addEventListener("DOMContentLoaded", initEntrance);
