function promalert() {
    var usr = document.getElementById("materialLoginFormUserId").value;
    var pass = document.getElementById("materialLoginFormPassword").value;
    if (usr === "@adiyogi" && pass === "123456") {
        Swal.fire(
            'Good job!',
            'Happy Streaming :)',
            'success'
        );
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        });
    }
}

