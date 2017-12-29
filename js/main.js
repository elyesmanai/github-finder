


$(document).ready(function(){

	
	// SEARCH BY USERNAME
	$('#searchuser').on('keyup', function(e){
		
		let username = e.target.value;

		//make request to Github
		$.ajax({
			url : 'https://api.github.com/users/'+username,
			data: {
				client_id:'d53cf0efcd03783fe3ba',
				client_secret:'8e32072faf7929f478d979b93b50582890fbbbdc',
			} 
		}).done(function(user){


				// another ajax call for the repos
				$.ajax({
					url : 'https://api.github.com/users/'+username+'/repos',
					data: {
						client_id:'d53cf0efcd03783fe3ba',
						client_secret:'8e32072faf7929f478d979b93b50582890fbbbdc',
						sort: 'created: asc'
					} 
				}).done(function(repos){
					//what to do with repos infos
					$.each(repos, function(index, repo){
						$('#repos').append(`
							<div class="well">
								<div class="row">
									<div class="col-md-7">
										<strong>${repo.name}</strong>: ${repo.description}
									</div>
									<div class="col-md-3">
										<span class="label label-default">${repo.forks_count}</span>
										<span class="label label-primary">${repo.watchers_count}</span>
										<span class="label label-success">${repo.stargazers_count}</span>
									</div>
									<div class="col-md-2">
										<a href="${repo.html_url}" target="_blank" class="btn btn-default">View Repo Page</a>
									</div>
								</div>
							</div>
						`);
					});
				});






				//what to do with user infos
				$('#profile').html(`
					<div class="panel panel-default">
					  <div class="panel-heading">${user.name}</div>
					  <div class="panel-body">
						<div class="row">


							<div class="col-md-3">
								<img src="${user.avatar_url}" class="thumbnail" width="100%" alt="" />
								<a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
							</div>

							<div class="col-md-9">
								<span class="label label-default">repos: ${user.public_repos}</span>
								<span class="label label-primary">girsts: ${user.public_gists}</span>
								<span class="label label-success">followers: ${user.followers}</span>
								<span class="label label-info">following: ${user.following}</span>
								<br /><br />

								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}</li>
									<li class="list-group-item">Website/Blog: ${user.blog}</li>
									<li class="list-group-item">Location: ${user.location}</li>
									<li class="list-group-item">Member Since: ${user.created_at}</li>
								</ul>
							</div>


						</div>
					  </div>
					</div>
					<h3>Latest repos</h3>
					<div id="repos"></div>
				`);
		 	});
		//that's it folks
	});

	// SEARCH BY LOCATION 
	$('#searchloca').on('keyup', function(e){
		
		let location = e.target.value;

		//make request to Github
		$.ajax({
			url : 'https://api.github.com/search/users?q=location%3A'+location,
			data: {
				client_id:'d53cf0efcd03783fe3ba',
				client_secret:'8e32072faf7929f478d979b93b50582890fbbbdc'
			} 
		}).done(function(users){
				$('#profile').html('<div class="row">');
				$.each(users.items, function(index, user){

					$('#profile').append(`
						<div class="col-md-3">
							<div class="panel panel-default">
							    <div class="panel-heading">${user.login}</div>
							    <div class="panel-body">
									<img src="${user.avatar_url}" class="thumbnail" width="100%" alt="" />
									<a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
							    </div>
							</div>
						</div>
					`);
				$('#profile').append('</div>');
				});
			});
	});

	//SEARCH BY TECHNOLOGY
	$('#searchtech').on('keyup', function(e){
		
		let tech = e.target.value;

		//make request to Github
		$.ajax({
			url : 'https://api.github.com/search/repositories?q='+tech,
			data: {
				client_id:'d53cf0efcd03783fe3ba',
				client_secret:'8e32072faf7929f478d979b93b50582890fbbbdc'
			} 
		}).done(function(repos){
				$('#profile').html('<div class="row">');
				$.each(repos.items, function(index, repo){

					$('#profile').append(`
						<div class="col-md-4">
							<div class="panel panel-default">
							    <div class="panel-heading">${repo.full_name}</div>
							    <div class="panel-body">
									<p>${repo.description}</p>
									<a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
							    </div>
							</div>
						</div>
					`);
				$('#profile').append('</div>');
				});
			});
	});
	
});
