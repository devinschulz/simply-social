namespace :gh_pages do

  desc "Remove contents of public directory"
  task :clean_up do 
    puts "Removing the contents of the public directory"
    FileUtils.rm_rf(Dir.glob('public/*'))
  end  

  desc "Compile and copy files to public directory"
  task :build do
    puts "Building Public Directory"
    status = system("gulp build:public")
    puts status ? "Compiled project into public directory" : "Failed to compile"
  end

  desc "Commit public directory"
  task :commit do
    puts "Committing Public Directory"
    status = system("git add -f public")
    puts status ? "Successfully added public directory" : "Failed to add public directory"
    puts "\n## Committing site build at #{Time.now.utc}"
    message = "\n## Site build at #{Time.now.utc}"
    status = system("git commit -m \"#{message}\"")
    puts status ? "Successfully committed public directory, ready for deploy" : "Failed to commit public directory"
  end

  desc "Deploy to gh-pages"
  task :deploy do
    puts "Deploying Public Directory to Github Pages"
    status = system("git subtree push --prefix public origin gh-pages")
    puts status ? "Successfully deployed public to gh-pages" : "Failed to deploy to gh-pages"
  end

  desc "Commit and Deploy"
  task :gh_pages_deploy => [:clean_up, :build, :commit, :deploy] do
    puts "Committed and deployed to Github Pages"
  end 

  task :default => 'gh_pages:gh_pages_deploy'
end