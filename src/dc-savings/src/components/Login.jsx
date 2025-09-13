const handleSubmit = () =>{
    if(!FormData.username || !FormData.password){
        alert("Please fill in all fields")
    } else {
        // proceed with login
        setTimeout(() => {
            localStorage.setItem("currentUser", JSON.stringify({
                username: FormData.username, //storeing the user's username in local storag
                LoginStatus: true, //indicating that the user is logged in
                LoginTime: Date.now
            }));
     alert(`Welcome back, ${formData.username}! You have successfully logged in.`);
      setIsLoading(false);        
    }, 2000); // Simulate a network request
}
};