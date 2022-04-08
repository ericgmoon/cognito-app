import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { isAdmin } from '../../utils';

const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body:
        { course,
          category = 'uncategorised',
          youtubeId,
          title = 'Untitled Video',
          creationDatetime = new Date().getTime(),
          resources = [],
          relatedVideos = [],
          host = 'Cognito Tuition' } } = req;

    if (!isAdmin(req)) return res.status(401).json({ message: 'Only admins & tutors may add videos' });

    const videoId = uuidv4();

    if (course && youtubeId) {
      const params = {
        TableName: 'videos',
        Item: {
          course,
          videoId,
          category,
          youtubeId,
          title,
          creationDatetime,
          resources,
          relatedVideos,
          host,
        },
      };

      const data = await docClient.put(params).promise();

      if (data) {
        return res.status(201).json({
          message: `Created video: ${title}`,
          data: {
            course,
            videoId,
            category,
            youtubeId,
            title,
            creationDatetime,
            resources,
            relatedVideos,
            host,
          },
        });
      }
      return res.status(400).json({ message: 'Video could not be created' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Video could not be created' });
  }
};
