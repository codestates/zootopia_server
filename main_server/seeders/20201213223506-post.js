'use strict';

// const { DataExchange } = require('aws-sdk');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        thumbnail:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_1:
          'https://www.iams.com/images/default-source/article-image/article_stomach-issues-in-cats-why-cats-vomit-and-what-to-do_header.jpg',
        picture_2:
          'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2',
        picture_3:
          'https://images.theconversation.com/files/336248/original/file-20200520-152302-97x8pw.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
        text: 'dummy post',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
