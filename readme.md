# Installation and Setup
## Node installation

```
git clone https://github.com/aayc/wordmath.dev
cd wordmath.dev
npm install
cd client
npm install
```

## Python Installation

```
cd wordmath.dev/routes/word2vec
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

## Models

```
cd wordmath.dev/routes/word2vec
mkdir models
```

Download the Google News 100B corpus model, Wikipedia + Gigaword5 model (300 dimensional) and Twitter (2B) datasets.

```
cd wordmath.dev/routes/word2vec/models
mv ~/<WHERE YOU STORED IT>/glove.6B.300d.txt .
mv ~/<WHERE YOU STORED IT>/GoogleNews-vectors-negative300.bin .
mv ~/<WHERE YOU STORED IT>/glove.twitter.27B.50d.txt .
```

# Running

```
cd wordmath.dev/client
npm start &
cd ..
PORT=3001 node bin/www
```

If you're hosting locally, navigate to localhost:3000.  If you're hosting on a server, use nginx to proxy to your React server (at port 3000) which will proxy to your Express server (at port 3001).

# Authors
Aaron Chan
  
Special thanks to Hannah Coons for the design :)
