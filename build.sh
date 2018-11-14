#installing node and npm on a mac machine. pre-requisite is homebrew
if which node > /dev/null
    then
        echo "node is installed, skipping..."
    else
        # add deb.nodesource repo commands 
        # install node
        brew install
        brew search node
        brew unlink node
        brew install node@8
        #brew link --overwrite --force node@8
        #brew link node@8
        sbrew unlink node@8 && brew link --force node@8
    fi

#cloning from git repo

git clone https://github.com/srikanthv02/tmdb

cd tmdb/client

echo 'inside'
	
#run npm install to install all dependencies included in package.json
yarn
#to install grunt
#sudo npm install grunt --save-dev

#to install gem and sass
#sudo gem install sass

#to make a client side dev build
sudo grunt build-dev

echo 'client side build over'

cd ../server

#run npm install to install all dependencies included in package.json
sudo npm install

#run the server to extract the links and images path
sudo npm start

#hit localhost:3001

#exit 0