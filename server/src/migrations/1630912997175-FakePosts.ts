import { MigrationInterface, QueryRunner } from 'typeorm'

export class FakePosts1630912997175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
insert into post (title, text, "creatorId") values ('Low Down, The', 'Sed vel enim sit amet nunc viverra dapibus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('So Close (Chik Yeung Tin Sai)', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Salaam Bombay!', 'In congue.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Barney''s Great Adventure', 'Etiam pretium iaculis justo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Wild Parrots of Telegraph Hill, The', 'Maecenas tincidunt lacus at velit.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Marley', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('7 Days in Havana', 'Etiam faucibus cursus urna.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Professional, The (Le professionnel)', 'Quisque id justo sit amet sapien dignissim vestibulum.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Return of a Man Called Horse, The', 'Phasellus sit amet erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Miss Météo', 'Cras pellentesque volutpat dui.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Shipping News, The', 'Suspendisse potenti.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('I Am (Jestem)', 'Aenean lectus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Redbelt', 'In quis justo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Liverpool', 'Morbi porttitor lorem id ligula.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Oranges', 'Cras non velit nec nisi vulputate nonummy.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Vanquished, The (I vinti)', 'Nulla facilisi.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('For Love or Country: The Arturo Sandoval Story', 'Maecenas tincidunt lacus at velit.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Old Man and the Sea, The', 'Aliquam non mauris.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Dante''s Peak', 'Phasellus sit amet erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Winter Sleepers (Winterschläfer)', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Ruhr', 'Vivamus tortor.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Dreamworld', 'Aenean auctor gravida sem.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Chicago Cab (a.k.a. Hellcab)', 'Suspendisse potenti.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('700 Sundays', 'Vestibulum ac est lacinia nisi venenatis tristique.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Chaos (Kaosu)', 'In eleifend quam a odio.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Before the Revolution (Prima della rivoluzione)', 'Sed ante.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Bey Yaar', 'Nam tristique tortor eu pede.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Switch', 'Quisque id justo sit amet sapien dignissim vestibulum.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Death Racers', 'Aliquam quis turpis eget elit sodales scelerisque.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Betty Blue (37°2 le matin)', 'Donec ut dolor.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Good Wife, The', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('My Brother Tom', 'Etiam justo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Someone I Loved (Je l''aimais)', 'In blandit ultrices enim.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Mr. Moto in Danger Island', 'Aenean sit amet justo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Calling Dr. Gillespie', 'Aliquam quis turpis eget elit sodales scelerisque.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Hand That Rocks the Cradle, The', 'Suspendisse ornare consequat lectus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Gambler, The', 'Curabitur in libero ut massa volutpat convallis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Voyage to the Bottom of the Sea', 'Morbi non lectus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Voyage to the End of the Universe (Ikarie XB 1)', 'Aenean auctor gravida sem.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Age of Stupid, The', 'Maecenas tincidunt lacus at velit.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Angels'' Share, The', 'Pellentesque eget nunc.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Yes: 9012 Live', 'Nam dui.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Drum', 'Aliquam sit amet diam in magna bibendum imperdiet.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Origin: Spirits of the Past (Gin-iro no kami no Agito)', 'Quisque ut erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Long Dark Hall, The', 'Morbi porttitor lorem id ligula.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Once Upon a Time in the Midlands', 'Morbi porttitor lorem id ligula.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Fire in the Blood', 'Nulla ut erat id mauris vulputate elementum.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Architecture of Doom, The (Undergångens arkitektur)', 'Quisque ut erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Summer of ''42', 'Aliquam sit amet diam in magna bibendum imperdiet.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('War of the Shaolin Temple (Shao Lin shi san gun seng)', 'Donec vitae nisi.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('St. Francisville Experiment, The', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Wedding Singer, The', 'Aenean auctor gravida sem.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Goodbye Uncle Tom', 'Sed ante.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Classe Tous Risques (Big Risk, The)', 'In blandit ultrices enim.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Turn It Up', 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('The Tree, the Mayor and the Mediatheque', 'Proin interdum mauris non ligula pellentesque ultrices.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('When the Last Sword is Drawn (Mibu gishi den)', 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Beats Being Dead (Dreileben - Etwas Besseres als den Tod)', 'Praesent blandit lacinia erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Dead in Tombstone', 'Maecenas tincidunt lacus at velit.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Gun Fury', 'Nunc purus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Sarah Silverman: Jesus Is Magic', 'Morbi porttitor lorem id ligula.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Looper', 'Donec ut dolor.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Goddess (Devi)', 'Vivamus vel nulla eget eros elementum pellentesque.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Past Midnight', 'Praesent blandit.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Alien Nation: Body and Soul', 'Nulla tempus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Ninja', 'Maecenas ut massa quis augue luctus tincidunt.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Hana (Hana yori mo naho)', 'Ut tellus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Do Not Disturb', 'Duis at velit eu est congue elementum.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Battle for Haditha', 'Nulla facilisi.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('My Future Boyfriend', 'Curabitur in libero ut massa volutpat convallis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Come Back, Little Sheba', 'Suspendisse ornare consequat lectus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Bunker, The', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Little Otik (Otesánek)', 'Morbi vel lectus in quam fringilla rhoncus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Century of the Dragon (Long zai bian yuan)', 'Pellentesque at nulla.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('2001 Maniacs', 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Regular Lovers (Amants réguliers, Les)', 'Morbi vel lectus in quam fringilla rhoncus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Dinosaurs: A Fun Filled Trip Back in Time', 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Fanny', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Hard to Be a God', 'In hac habitasse platea dictumst.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Eaten Alive', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Chitty Chitty Bang Bang', 'Maecenas ut massa quis augue luctus tincidunt.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Two Lovers', 'Phasellus in felis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Trouble with the Curve', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Winter Kills', 'Nam tristique tortor eu pede.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Parineeta', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Scarface', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Monsterman (Monsterimies)', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Generation X', 'Maecenas pulvinar lobortis est.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Vermin', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Ambulance, The', 'Ut tellus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Buffalo ''66 (a.k.a. Buffalo 66)', 'Suspendisse potenti.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Castaway on the Moon (Kimssi pyoryugi)', 'Sed sagittis.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('King & Country', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Thank You, Jeeves!', 'In quis justo.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Violet Tendencies', 'Maecenas rhoncus aliquam lacus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Man Who Wasn''t There, The', 'Aliquam non mauris.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Viridiana', 'Praesent blandit lacinia erat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('Not Another Happy Ending', 'Cras non velit nec nisi vulputate nonummy.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('As I Was Moving Ahead Occasionally I Saw Brief Glimpses of Beauty', 'Fusce consequat.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
insert into post (title, text, "creatorId") values ('I Am Jesus', 'Sed vel enim sit amet nunc viverra dapibus.', '8b74b16f-51d0-4546-823a-68185b22bdf4');
                              `)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}