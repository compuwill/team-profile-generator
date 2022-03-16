fetch("team.json")
    .then(res => res.json())
    .then(team => {
        team.forEach(teamMember => {
            //create a new div element
            var card = $("<div>").addClass("card m-3");
            var cardheader = $("<div>").addClass("card-header");
            var teamMemberName = $("<p>").addClass("card-header-title  is-size-5").text(teamMember.name)


            var icon;

            cardheader.append(teamMemberName);
            card.append(cardheader);

            //card content
            var cardcontent = $("<div>").addClass("card-content p-5");
            var teamMemberID = $("<p>").addClass("card p-2").text(`ID: ${teamMember.id}`)
            var teamMemberEmail = $("<p>").addClass("card p-2").html(`Email: <a href="mailto:${teamMember.email}">${teamMember.email}</a>`)
            //create a new p element        
            cardcontent.append(teamMemberID);
            cardcontent.append(teamMemberEmail);

            card.append(cardcontent);

            //role specific items
            if (teamMember.role === 'Intern') {
                cardheader.addClass("has-background-light")
                icon = 'fa-graduation-cap';
                var teamMemberSchool = $("<p>").addClass("card p-2").text(`School: ${teamMember.school}`)
                cardcontent.append(teamMemberSchool);
            }
            if (teamMember.role === 'Engineer') {
                cardheader.addClass("has-background-warning")
                icon = 'fa-glasses';
                var teamMemberGitHub = $("<p>").addClass("card p-2").html(`GitHub Profile: <a href="http://www.github.com/${teamMember.github}" target="_blank">${teamMember.github}</a>`)
                cardcontent.append(teamMemberGitHub);
            }

            if (teamMember.role === 'Manager') {
                cardheader.addClass("has-background-danger")
                icon = 'fa-mug-hot';
                var teamMemberOffice = $("<p>").addClass("card p-2").text(`Office Number: ${teamMember.officeNumber}`)
                cardcontent.append(teamMemberOffice);
            }

            var teamMemberIcon = $("<div>").addClass("card-header-icon is-size-5").html(`${teamMember.role}<div class='m-1'/><i class='fas ${icon}' aria-hidden='true'></i>`)
            cardheader.append(teamMemberIcon);


            $("#main").append(card);
        })
    });