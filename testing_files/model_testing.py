import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.layers import Dense, Input, Activation
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.callbacks import Callback
from sklearn.datasets import make_circles


#tf.debugging.set_log_device_placement(True)

num_points = 300
x, y = make_circles(n_samples=num_points, random_state=144, shuffle=True, factor=0.7, noise=0.01)
def build_model2(): 
  model = Sequential() 
  model.add(Dense(units = 8, input_dim=2, activation='tanh'))
  # num_parameters = 8 * (2 + 1) = 24 
  model.add(Dense(units = 8, activation='tanh')) 
  # = 8 * (8 + 1) = 72
  model.add(Dense(units = 1, activation='sigmoid')) 
  # = 1 * (8 + 1) = 9
  return model

model = build_model2()
sgd = SGD(lr=0.05, decay=1e-6, momentum=0.9)
model.compile(loss='binary_crossentropy',
              optimizer=sgd,
              metrics=['accuracy'])

history = model.fit(x,
                    y, 
                    epochs=150, 
                    batch_size=128, 
                    validation_split=0.2,
                    )