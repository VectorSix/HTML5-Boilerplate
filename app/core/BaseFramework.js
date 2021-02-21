import $ from 'jQuery';
import PubSub from 'pubsub-js'

export default (appRunner) => {
    $(() => {
        // Load Base State Events
        $('body').on('change', "[data-model]", (e) => {
            const path = $(e.target).attr("data-model");
            const uid = $(e.target).closest("[data-container]").attr("data-container");
            PubSub.publish('STATE:ON_CHANGE', {event: e.type, uid: uid, path: path, value: $(e.target).val(), element: $(e.target)});
        });
        $('body').on('keyup', "[data-model]", (e) => {
            const path = $(e.target).attr("data-model");
            const uid = $(e.target).closest("[data-container]").attr("data-container");
            PubSub.publish('STATE:ON_KEYUP', {event: e.type, uid: uid, path: path, value: $(e.target).val(), element: $(e.target)});
        });

        // Start AppRunner
        appRunner();
    });
}