<template>

<el-container style="height: 550px; border: 1px solid #eee">
  <el-main>
    <div class="train-controls">
      <h2 class="section col-sm-1">Training Data (x,y) pairs</h2>
      <div class="field-label">X</div><div class="field-label">Y</div>

      <div v-for="(item, index) in xValues" v-bind:key="index">
        <div>

          <div class="col-sm-1">
            <input class="field field-x" v-model="xValues[index]" type="number">
            <input class="field field-y" v-model="yValues[index]" type="number">
          </div>
      </div>
      </div>

      <button class="button-add-example button--green" v-on:click="addItem">+</button>
      <button class="button-train button--green" v-on:click="train">Train</button>
    </div>

    <div class="predict-controls">
      <h2 class="section col-sm-1">Predicting</h2>
      <input class="field element" v-model="valueToPredict" type="number" placeholder="Enter an integer number"><br>
      <div class="element">{{predictedValue}}</div>
      <button class="element button--green" v-on:click="predict" :disabled="!trained">Predict</button>
    </div>
  </el-main>
</el-container>
</template>

<script>
import * as tf from '@tensorflow/tfjs';

export default {
  data() {
    return {
      trained: false,
      xValues: [1,2,3,4],
      yValues: [1,3,5,7],
      predictedValue:'Click on train!',
      valueToPredict: ''
    }
  },
  methods: {
    addItem() {
      this.xValues.push(0);
      this.yValues.push(0);
    },
    train() {
      // Define a model for linear regression.
      const model = this.model = tf.sequential();
      model.add(tf.layers.dense({units: 1, inputShape: [1]}));

      // Prepare the model for training: Specify the loss and the optimizer.
      model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

      const xs = tf.tensor2d(this.xValues, [this.xValues.length, 1]);
      const ys = tf.tensor2d(this.yValues, [this.yValues.length, 1]);

      // Train the model using the data.
      model.fit(xs, ys, {epochs: 50}).then(() => {
        this.trained = true;
        this.predictedValue = 'Ready for making predictions';
      });
    },
    predict() {
      // Use the model to do inference on a data point the model hasn't seen before:
      this.predictedValue = this.model.predict(tf.tensor2d([this.valueToPredict], [1, 1])).get(0, 0);
    }
  }
}
</script>

<style>
</style>
