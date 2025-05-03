let selectElem = document.querySelector("select");

let logo = document.querySelector("img");

selectElem.addEventListener("change", changeTheme);

    function changeTheme() {
        let current = selectElem.value;

            if (current == "dark") {
                document.body.className = ("dark");
            // give body the class dark
            // add different image by changing src
            } else {
                //take off clases
                // change the image back to the original
            }
        }