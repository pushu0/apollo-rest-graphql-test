<template>
    <!-- access apollo query through apollo component -->
    <ApolloQuery
      :query="require('../graphql/getUsers.gql')"
      :variables="{ users }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>    
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
              <v-data-table
                :headers="tableHeaders"
                :items="data.users"
                :loading="loading"
                class="elevation-1"
            > 
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.id }}</td>
                    <td class="text-xs-left">
                        <v-edit-dialog
                                :return-value.sync="props.item.name"
                                large
                                lazy
                                persistent
                                @save="editUser(props.item)"
                                @cancel="cancel"
                                @open="open"
                                @close="close"
                            >
                                     {{ props.item.name }}
                                <v-text-field
                                slot="input"
                                v-model="props.item.name"
                                :rules="[max25chars]"
                                label="Edit"
                                single-line
                                counter
                            ></v-text-field>
                        </v-edit-dialog>
                    </td>
                    <td class="text-xs-left">
                            <v-edit-dialog
                                :return-value.sync="props.item.email"
                                large
                                lazy
                                persistent
                                @save="editUser(props.item)"
                                @cancel="cancel"
                                @open="open"
                                @close="close"
                            > 
                        {{ props.item.email }}
                            <v-text-field
                                slot="input"
                                v-model="props.item.email"
                                :rules="[max25chars]"
                                label="Edit"
                                single-line
                                counter
                            ></v-text-field>
                       </v-edit-dialog>     
                    </td>
                    <td class="text-xs-left">
                        <v-edit-dialog
                            :return-value.sync="props.item.company.name"
                            large
                            lazy
                            persistent
                            @save="editUser(props.item)"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                        >
                             {{ props.item.company.name }}
                         <v-text-field
                                slot="input"
                                v-model="props.item.company.name"
                                :rules="[max25chars]"
                                label="Edit"
                                single-line
                                counter
                        ></v-text-field>   
                       </v-edit-dialog>                           
                    </td>                    
                </template>
            </v-data-table>
            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                {{ snackText }}
                <v-btn flat @click="snack = false">Close</v-btn>
            </v-snackbar>
        </div>

  
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>

 </template>    


<script>
import gql from 'graphql-tag'
export default {
  data () {
    return {
      snack: false,
      snackColor: '',
      snackText: '',
      users: [],
      tableHeaders: [
          {text: 'ID', value: 'id'},
          {text: 'name', value: 'name'},
          {text: 'email', value: 'email'},
          {text: 'company', value: 'company'},
          
      ],
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},             
    }
  },

  apollo: {

  },

  computed: {
      
  },

  methods: {
      //access apollo mutation through methods
      editUser({id, name, email, company}) {                     
              // Call to the graphql mutation
              this.$apollo.mutate({
                // Query
                mutation: gql`
                    mutation ($id: ID!, $name: String, $email: String, $company: String){
                        editUser(id: $id, name: $name, email:  $email, company: $company) {
                            id
                            name
                            email
                            company {
                                name
                            }
                        }
                    }`,
                // Parameters
                variables: {
                    id: id,
                    name: name,
                    email: email,
                    company: company.name
                },
                }).then((data) => {
                    // Result     
                    // response to confirm mutation has been successfull
                    console.log(data)           
                    this.save()
                }).catch((error) => {
                    // Error                
                    this.cancel(error);
            })
      },
     save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
        
      },
      cancel (error) {
        this.snack = true
        this.snackColor = error
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      }
 
  },
}
</script>