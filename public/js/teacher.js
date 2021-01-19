document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded')
})

const addTeacher = (teacherData) => {
    fetch ('/api/teachers', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData)
    }).then(getTeacher)
        .catch((err) => console.error(err))
}

const getTeacher = () => {
    console.log('Get Teacher is getting called');
    fetch('/api/teachers', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        // .then((data) => {
        // // console.log('Success in getting authors:', authors);
        // const rowsToAdd = [];
        // for (let i = 0; i < data.length; i++) {
        //     rowsToAdd.push(createTeacherRow(data[i]));
        // }
        // renderTeacherList(rowsToAdd);
        // nameInput.value = '';
        // })
        // .catch((error) => console.error('Error:', error));
};

