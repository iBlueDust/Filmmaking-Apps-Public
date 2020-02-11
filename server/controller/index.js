'use strict';

const OFFLINE = 'OFFLINE';
const ONLINE = 'ONLINE';

const socket = io();

const PanelComponent = Vue.component('panel', {
    props: {
        panel: Object
    },
    data: () => {
        return {
            id: null,
            likes: 0,
            targetLikes: 0,
            targetName: null,
            status: OFFLINE
        }
    },
    methods: {
        async SetLikes() {
            console.log(`Setting ${this.targetLikes} likes`);

            // socket.emit('profile update', { profileId: this.id, data = })
        },
        async SetName() {
            console.log(`Setting ${this.targetName} as name`);
            const response = await fetch(this.panel.apipath, this.GetDataPackage({
                type: 'set name',
                value: this.targetName,
                projectorId: this.panel.id
            }))

            const body = await response.json();
            if (body.status == 'success') {
                this.panel.name = this.targetName;
                console.log(`Successfully set ${this.targetName} as name`);
            } else console.error(`Failed to set ${this.targetName} as name`);
        },
        IncrementLikes() {
            this.targetLikes++;
            this.SetLikes();
        },
        DecrementLikes() {
            this.targetLikes--;
            this.SetLikes();
        },
        GetDataPackage(body) {
            return {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        }
    },
    template: `
    <div class="panel">
        <h2>{{panel.title}}</h2>
        <h3 class="status-display">Status: <span class="status-span">{{panel.status}}</span></h3>
        <h3 class="name-display">Name: <span class="name-span">{{panel.name}}</span></h3>
        <h3 class="likes-display">Likes: <span class="likes-span">{{likes}}</span></h3>

        <span class="label">Name: </span>
        <input type="text" v-bind:title="'Set name for ' + panel.name" v-model="targetName" class="name" />
        <button class="name-btn set" v-on:click="SetName">Set</button>
        <button class="name-btn animate">Animate</button>
        <br />
        
        <span class="label">Likes:  </span>
        <input type="number" v-bind:title="'Set likes for ' + panel.name" v-model.number="targetLikes" class="likes" />
        <button class="number-btn set" v-on:click="SetLikes">Set</button>
        <button class="number-btn animate">Animate</button>
        
        <button class="likes-add-1" v-on:click="IncrementLikes">+1</button>
        <button class="likes-subtract-1" v-on:click="DecrementLikes">-1</button>
    </div>
    `
});


(async function() {
    let ip = '';
    try {
        ip = await (await fetch('../server-ip.txt')).text();
    } catch {
        alert('Could not get server ip');
    }

    const app = new Vue({
        el: '#app',
        data: {
            panels: [{
                    id: 0,
                    apipath: ip + ':3000/projector',
                    title: 'Projector 1',
                    name: null
                },
                {
                    id: 1,
                    apipath: ip + ':3000/projector',
                    title: 'Projector 2',
                    name: 'Melinda'
                }
            ]
        },
        components: {
            panel: PanelComponent
        }
    });
})();