from gensim.test.utils import datapath, get_tmpfile
from gensim.scripts.glove2word2vec import glove2word2vec
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from gensim.models import Doc2Vec
from gensim.models.keyedvectors import Doc2VecKeyedVectors

print("Loading model")
#model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)

glove2word2vec("glove.6B.300d.txt", "converted.txt")
model = KeyedVectors.load_word2vec_format("converted.txt")
print("After loading model")
equations = [[["fire"], ["cold"]],
             [["smartphone"], ["attention"]],
             [["love"], ["gossip"]],
             [["shirts", "pants"],["shoes"]]]

for eq in equations:
    print(" + ".join(eq[0]), " - ", " - ".join(eq[1]))
    print("\t=", model.most_similar(positive=eq[0], negative=eq[1]))

while True:
    pos = input("positive words separated by space: ")
    neg = input("negative words separated by space: ")
    print(model.most_similar(positive = pos.split(" ") if len(pos) > 0 else [], negative = neg.split(" ") if len(neg) > 0 else []))

