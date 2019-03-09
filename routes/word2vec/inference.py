from gensim.test.utils import datapath, get_tmpfile
from gensim.scripts.glove2word2vec import glove2word2vec
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from gensim.models import Doc2Vec
from gensim.models.keyedvectors import Doc2VecKeyedVectors


model_fnames = {"wikipedia": "routes/word2vec/models/glove.6B.300d.txt"}
          #"google_news": "models/GoogleNews-vectors-negative300.bin" }

models = {}

for model_name, model_fname in model_fnames.items():
    if model_name == "google_news":
        models[model_name] = KeyedVectors.load_word2vec_format(model_fname, binary = True)
    elif model_name == "wikipedia":
        glove2word2vec(model_fname, "routes/word2vec/models/tmp.txt")
        models[model_name] = KeyedVectors.load_word2vec_format("tmp.txt")

model = models["wikipedia"]
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

    similar = model.most_similar(positive = pos, negative = neg)
    words_only = [m[0] for m in similar]
    print(" ".join(words_only))

