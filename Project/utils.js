module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
        
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
      
        }
    
        return age
    },

    date_ptBR_now: function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return today
    },

    date: function(timestamp) {
        //yyyy-mm-dd
        //da para fazer usando método slice da string slice(-2)
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0')

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

    bloodType: function(bloodType) {
        let bloodTypeConverted

        if (bloodType.includes('1')) {
            bloodTypeConverted = bloodType.replace('1', '+')
        } else {
            bloodTypeConverted = bloodType.replace('0', '-')
        }
        
        return bloodTypeConverted
    }
}