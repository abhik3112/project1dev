import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const userUserStore = defineStore ('user', () => {
  const firstName = ref('')
  const lastName = ref('')
  const userName = ref('')
  const email = ref('')
  const password = ref('')

  const wholeName = computed(() => firstName.value + ' ' + lastName.value)

  function setUser(fName, lName, uName, eml, pssrd) {
    firstName.value = fName ?? ''
    lastName.value = lName ?? ''
    userName.value = uName ?? ''
    email.value = eml ?? ''
    password.value = pssrd ?? ''
  }


  return {firstName, lastName, userName, email, wholeName, password, setUser}
})
