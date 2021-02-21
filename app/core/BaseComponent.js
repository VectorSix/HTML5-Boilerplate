
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import PubSub from 'pubsub-js'

class BaseComponent {
    /**
     * Constructor
     */
    constructor() {
        this.INTERNAL_EL = {};
        this.INTERNAL_STATE = "";
        this.INTERNAL_UID = uuidv4()
        this.eventManager();
    };

    /**
     * Override
     */
    render() {}
    eventManager() {}

    state(value) {
        if(typeof(value) === 'object') {
           this.INTERNAL_STATE = value;
           this.render();
        }
        return this.INTERNAL_STATE;
    }

    /**
     * Change State
     */
    setState(dataPath, value) {
        const path = dataPath.split(".");
        const setStateRecursive = (state, path) => {
            const key = path.shift();
            if(typeof(key) !== 'undefined') {
                    if(typeof(state[key]) !== 'undefined') {
                        state[key] = setStateRecursive(state[key], path)
                    }
                return state;
            } else {
                return value;
            }
        }
        this.INTERNAL_STATE = setStateRecursive(this.INTERNAL_STATE, path);
        this.renderTo(this.INTERNAL_EL);
    }

    /**
     * State OnChange
     */
    stateOnChange(data) {
        if(this.INTERNAL_UID === data.uid) {
            this.setState(data.path, data.value);
        }
    }

    /**
     * Render Page to Container
     * @param {String} el Root Element Selector
     */
    renderTo(el) {
        if(!$(el)[0].hasAttribute('data-container')) {
            this.INTERNAL_EL = el;
            $(el).attr('data-container', this.INTERNAL_UID);
            PubSub.subscribe('STATE:ON_CHANGE', (e, data)=>{ this.stateOnChange(data); });
        }
        $(el).html(this.render());
    }    

    /**
     * Render Templates
     * @param {*} mustache 
     * @param {*} values 
     */
    renderTemplate(mustache, values) {
        const renderTemplateRecursive = (obj) => {
            for (var k in obj) {
                if(typeof(obj[k]) === "object" && (obj[k] instanceof BaseComponent)) {
                    obj[k] = obj[k].render();        
                } else {
                    if (typeof(obj[k]) === "object" && obj[k] !== null) {
                        obj[k] = renderTemplateRecursive(obj[k]);
                    }
                }
            }
            return obj;
        }
     
        const renderedValues = renderTemplateRecursive(values);
        return mustache(renderedValues);
    }

    /**
     * Get Json Value
     * @param {*} dataPath 
     * @param {*} json 
     * @param {*} defaultValue 
     */
    getJsonValue(dataPath, json, defaultValue) {
        if(typeof(json) === 'undefined') {
            return defaultValue;
        }

        const getJsonValueRecursive = (dataPath, json) => {
            const key = dataPath.shift();
            if(typeof(key) !== 'undefined') {
                if(typeof(json[key]) !== 'undefined') {
                    return getJsonValueRecursive(dataPath, json[key])
                }
                return defaultValue;
            } else {
                return json;
            }
        }

        dataPath = dataPath.split(".");
        return getJsonValueRecursive(dataPath, json);
    }  
}

export default BaseComponent;