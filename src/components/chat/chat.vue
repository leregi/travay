<template>
  <div class="chat container">
      <div class="text-condition">
          <p class="righ teal-text">This chat room is not private and is visibable by the Travay team. This chat room is for professional communications between the manager, evaluator and worker of a job. If there is a dispute regarding job payout the Travay team will use this discussion thread to validate history of events.
          </p>
      </div>
        <div class="card chat-card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{photo}}</span>
                        <span class="grey-text text-darken-3">{{message.text}}</span>
                        <span class="grey-text time">{{message.date}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <div class="new-message">
                    <form @submit.prevent="addMessage">
                        <label for="new-message">New Message (enter to add):</label>
                        <input type="text" name="new-message" v-model="newMessage">
                        <!-- <p class="red-text" v-if="feedback">{{ feedback }}</p> -->
                    </form>
                </div>   
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { uuid } from "vue-uuid";
import moment from "moment";
import firebase from "firebase";
import db from "../../firebaseinit";
import * as types from "../../store/types";
import { store } from "../../store";
export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      newMessage: null,
      photo: null
    };
  },

  created() {
    const userPhoto = db
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data().photoURL);
        });
      });
    this.photo = this.userPhoto;
    let ref = db.collection("messages").orderBy("date");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            userId: doc.data().userId,
            text: doc.data().text,
            // userPhoto:doc.data().this.userPhoto,
            date: moment(doc.data().date).format("lll")
          });
        }
      });
    });
  },
  computed: {
    ...mapGetters({
      userId: types.GET_USER_ID
    })
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, this.userId, Date.now(), this.userPhoto);
      if (this.newMessage) {
        db.collection("messages")
          .set({
            text: this.newMessage,
            userId: this.userId,
            // userPhoto: this.userPhoto,
            date: Date.now()
          })
          .then(() => null)
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        // this.feedback = null;
        console.log("yeah!");
      }
      // } else {
      //   this.feedback = "You must enter a message in order to send one";
      // }
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 100%;
  padding-top: 60px;
}
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
.container {
  display: grid;
  grid-template-columns: 50% 50%;
}
.text-condition {
  padding-top: 0;
  padding-right: 150px;
}
.text-condition p {
  font-size: 1.2em;
}
</style>