const API = 'https://randomuser.me/api/?results=9'
let dataUser = []

async function getData() {
  try {
    const response = await fetch(API)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    dataUser = data.results
    updateUserList() // Ma'lumotlar qabul qilingandan so'ng yangilash
  } catch (error) {
    console.error("Xatolik sodir bo'ldi:", error)
  } finally {
    // Loaderni yashirish
    document.getElementById('overlay').classList.add('hidden')
  }
}

function updateUserList() {
  const inputElement = document.getElementById('form__input')
  const value = inputElement.value.toLowerCase().trim()
  console.log('Search value:', value)

  const filterUsers = dataUser.filter((user) => {
    const fullName = `${
      user.name.title.toLowerCase() + user.name.first.toLowerCase() + user.name.last.toLowerCase()
    }`
    return fullName.includes(value)
  })

  console.log('Filtered users:', filterUsers)

  const userList = filterUsers
    .map(
      (item, index) =>
        `<li class="user__item">
                        <button onclick="deleteItem(${index})" title="Delete" class="user__delete--btn">
                            <i class="fas fa-trash"></i>
                        </button>
                        <img
                            class="user__img"
                            alt="User photo"
                            src="${item.picture.medium}"
                            width="100"
                            height="100"
                        />
                        <div class="user__name">
                            <span class="material-symbols-outlined">badge</span>
                            <span>- ${item.name.title} ${item.name.first} ${item.name.last}</span>
                        </div>
                        <div class="user__year">
                            <span class="material-symbols-outlined">cake</span>
                            <span>- ${item.dob.age} years old.</span>
                        </div>
                        <div class="user__location">
                            <span class="material-symbols-outlined">person_pin_circle</span>
                            <span>- ${item.location.city}, ${item.location.country}</span>
                        </div>
                        <div class="user__gender">
                            <span>- ${item.gender}</span>
                        </div>
                    </li>`
    )
    .join('')
  console.log('User list HTML:', userList)

  document.getElementById('user').innerHTML = userList
}

function deleteItem(index) {
  dataUser.splice(index, 1) // Asosiy ma'lumotlar massividan elementni olib tashlash
  updateUserList() // Foydalanuvchilar ro'yxatini yangilash
}

document.getElementById('form__input').addEventListener('input', updateUserList)

document.getElementById('form__button').addEventListener('click', (e) => {
  e.preventDefault()
  document.getElementById('user').innerHTML = ''
  document.getElementById('form__input').value = ''
  document.getElementById('overlay').classList.remove('hidden') // Loaderni ko'rsatish
  getData()
})

document.getElementById('clear__button').addEventListener('click', (e) => {
  e.preventDefault()
  document.getElementById('user').innerHTML = ''
  document.getElementById('form__input').value = ''
})

// Dastlabki ma'lumotlarni yuklash
getData()
