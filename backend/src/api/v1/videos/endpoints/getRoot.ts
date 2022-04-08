import { Request, Response } from 'express';

import { getVideo } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { params: { course, videoId } } = req;

    if (course && videoId) {
      const data = await getVideo(course, videoId);

      if (data) {
        const exposedData = ((
          { youtubeId,
            title,
            author,
            uploadDate,
            path,
            resources,
            relatedVideos }) => ({
          course,
          videoId,
          youtubeId,
          title,
          author,
          uploadDate,
          path,
          resources,
          relatedVideos,
        }))(data);

        return res.status(200).json({ data: exposedData });
      }
      return res.status(400).json({ message: 'Video could not be found' });
    }

    return res.status(400).json({ message: 'Course or video ID was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Video could not be retrieved' });
  }
};
