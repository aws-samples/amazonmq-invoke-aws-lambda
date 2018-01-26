/**
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const uuid = require('uuid/v4')
const AWS = require('aws-sdk')
const util = require('util')

const ddb = new AWS.DynamoDB.DocumentClient()
const MESSAGE_TABLE = process.env.TABLE_NAME

exports.handler = (event, context, callback) => {
  console.log(util.inspect(event, { depth: 6 }))

  let params = {
    TableName: MESSAGE_TABLE,
    Item: {
      uuid: uuid(),
      timestamp: event.timestamp,
      message: event.message
    }
  }
    
  ddb.put(params, (error, result) => {
    if (error) {
      console.error(error.message)
      callback(error)
    } else {
      callback(null, { 'message': 'Finished' })
    }
  })
}