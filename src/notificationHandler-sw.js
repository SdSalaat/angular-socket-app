
(function() {
  "use strict";
  // let window = window.open(``, "_blank");
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    // window.location = `http://localhost:8080`;
    window.open(event.notification.data.host)
    console.log("notification details: ", event.notification);
  });
}());
