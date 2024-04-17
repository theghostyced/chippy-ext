
// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(() => {
    if (!window._gmailjs) {
        return;
    }

    clearInterval(loaderId);
    startExtension(window._gmailjs);
}, 100);

// actual extension-code
function startExtension(gmail) {
    window.gmail = gmail;

    gmail.observe.on("view_email", (domEmail) => {
        const userEmail = gmail.get.user_email();
        sessionStorage.setItem("userEmail", userEmail);
        const threadData = gmail.new.get.thread_data(domEmail);
        sessionStorage.setItem("emailThread", JSON.stringify(threadData));
    });
}