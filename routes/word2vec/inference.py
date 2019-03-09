from gensim.test.utils import datapath, get_tmpfile
from gensim.scripts.glove2word2vec import glove2word2vec
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from gensim.models import Doc2Vec
from gensim.models.keyedvectors import Doc2VecKeyedVectors


USE_MODELS = ["google_news", "wikipedia", "twitter"]
model_fnames = {"wikipedia": "routes/word2vec/models/glove.6B.300d.txt",
          "google_news": "routes/word2vec/models/GoogleNews-vectors-negative300.bin",
          "twitter": "routes/word2vec/models/glove.twitter.27B.50d.txt"}

models = {}

for model_name, model_fname in model_fnames.items():
    if model_name not in USE_MODELS:
        continue
    if model_name == "google_news":
        models[model_name] = KeyedVectors.load_word2vec_format(model_fname, binary = True, limit = 100000)
    elif model_name == "wikipedia":
        glove2word2vec(model_fname, "routes/word2vec/models/tmp.txt")
        models[model_name] = KeyedVectors.load_word2vec_format("routes/word2vec/models/tmp.txt", limit = 100000)
    elif model_name == "twitter":
        glove2word2vec(model_fname, "routes/word2vec/models/tmp.txt")
        models[model_name] = KeyedVectors.load_word2vec_format("routes/word2vec/models/tmp.txt", limit = 100000)

print("LOADED MODEL")

while True:
    eq = input()
    split_plus = "".join(eq.split()).split("+")
    split_plus = list(filter(lambda x: x != '', split_plus))
    split_full = [m.split("-") for m in split_plus]

    # Every first parameter in the list is a positive, every other in each list is a negative
    pos = []
    neg = []
    for l in split_full:
        pos.append(l[0])
        neg.extend(l[1:])

    res = []
    for model_name in USE_MODELS:
        if all([w in models[model_name].vocab for w in pos]) and all([w in models[model_name].vocab for w in neg]):
            similar = models[model_name].most_similar(positive = pos, negative = neg)
            words_only = [m[0] for m in similar]
            res.append(model_name + ":" + " ".join(words_only))
        else:
            res.append(model_name + ":" + "not_in_database")
    print(";".join(res))
