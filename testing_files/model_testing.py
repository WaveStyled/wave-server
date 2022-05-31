import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.layers import Dense, Input, Activation
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.callbacks import Callback
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_circles



def enumerate_colors(colors):
  filtered_list = list(filter(lambda ele:ele is not None, colors))
  unique_colors = set(filtered_list)
  return {col: i for i, col in enumerate(unique_colors)}

def add_color_to_mapping(mapping, color):
  if color and color not in mapping:
    val = max(mapping, key=mapping.get)+1
    mapping[color] = val


#tf.debugging.set_log_device_placement(True)

num_points = 300
x, y = make_circles(n_samples=num_points, random_state=144, shuffle=True, factor=0.7, noise=0.01)
def build_model2(): 
  model = Sequential() 
  model.add(Dense(units = 8, input_dim=2, activation='relu'))
  # num_parameters = 8 * (2 + 1) = 24 
  model.add(Dense(units = 16, activation='relu')) 
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