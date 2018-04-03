import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { equal, notEmpty } from '@ember/object/computed';
import RSVP from 'rsvp';

// Simple service to authenticate a user with basic auth.
// The user must also exist as a User object in the store.

export default Service.extend({
  user: null,
  authenticated: notEmpty('user', null).readOnly(),
  isAdmin: equal('user.role', 'admin').readOnly(),
  isPI: equal('user.role', 'pi').readOnly(),

  store: service(),

  // Attempt to login with given credentials
  // Return a Promise which will resolve to the specified user on success
  // and undefined if the user does not exist.
  login(username, password) {
    this.set('user', null);

    // Ensure that empty username matches nothing
    if (!username || username.trim().length == 0) {
      return new RSVP.Promise(() => undefined);
    }

    let store = this.get('store');
    let adapter = store.adapterFor('application')

    adapter.set('username', username);
    adapter.set('password', password);

    // First attempt to login with Basic auth.
    // If successfull and test objects are not loaded, load test objects
    // Finally check to make sure user is in store

    return store.findAll('user').then(users => {
      if (users.get('length') == 0) {
        return this.createTestData().then(() => store.findAll('user'));
      } else {
        return users;
      }
    }).then(users => {
      let match = users.find(user => user.get('username') === username);

      if (match) {
        this.set('user', match);
      }
    });
  },

  logout() {
    this.set('user', null);
  },

  // Return a promise to create the test data
  createTestData() {
      // Create the test objects without relationships

    let store = this.get('store');

    let user1 = store.createRecord('user', {
      username: 'admin',
      role: 'admin'
    });

    let user2 = store.createRecord('user', {
      username: 'agudzun',
      role: 'pi'
    });

    let user3 = store.createRecord('user', {
      username: 'BenjaminHarman',
      role: 'pi'
    });

    let user4 = store.createRecord('user', {
      username: 'CynthiaSears',
      role: 'pi'
    });

    let funder1 = store.createRecord('funder', {
        name: 'National Eye Institute',
        repo: 'PMC'
    });

    let funder2 = store.createRecord('funder', {
        name: 'National Science Foundation',
        repo: 'NSF-PAR'
    });

    let funder3 = store.createRecord('funder', {
        name: 'National Inst Of Diabetes And Digestion',
        repo: 'PMC'
    });

    let funder4 = store.createRecord('funder', {
        name: 'National Inst of Mental Health',
        repo: 'PMC'
    });

    let funder5 = store.createRecord('funder', {
        name: 'National Institute of Health',
        repo: 'PMC'
    });

    let coeus1 = store.createRecord('identifier', {
        label: '16129769'
    });

    let coeus2 = store.createRecord('identifier', {
        label: '16120629'
    });

    let coeus3 = store.createRecord('identifier', {
        label: '16120539'
    });
    let coeus4 = store.createRecord('identifier', {
        label: '16120469'
    });

    let coeus5 = store.createRecord('identifier', {
        label: '16120459'
    });

    let coeus6 = store.createRecord('identifier', {
        label: '16120169'
    });
    let coeus7 = store.createRecord('identifier', {
        label: '1204023'
    });

    let coeus8 = store.createRecord('identifier', {
        label: '16119319'
    });

    let coeus9 = store.createRecord('identifier', {
        label: '16119219'
    });
    let coeus10 = store.createRecord('identifier', {
        label: '16118979'
    });

    let coeus11 = store.createRecord('identifier', {
        label: '16108389'
    });

    let coeus12 = store.createRecord('identifier', {
        label: '16097079'
    });
    let coeus13 = store.createRecord('identifier', {
        label: '16086889'
    });

    let coeus14 = store.createRecord('identifier', {
        label: '16075399'
    });


    let person1 = store.createRecord('person', {
        displayName: 'Ernest Ford',
        email: 'ford@example.com'
    });

    let person2 = store.createRecord('person', {
        displayName: 'Anne Gudzune',
        email: 'anne@example.com'
    });

    let person3 = store.createRecord('person', {
        displayName: 'Stephen Pillage',
        email: 'illage@example.com'
    });

    let person4 = store.createRecord('person', {
        displayName: 'Eric Frey',
        email: 'frey@example.com'
    });

    let person5 = store.createRecord('person', {
      displayName: 'Michael Jacobs',
      email: 'mjacobe@example.com'
    });

    let person6 = store.createRecord('person', {
      displayName: 'John Wong',
      email: 'wongj@jhu.edu'
    });

    let person7 = store.createRecord('person', {
      displayName: 'Tiffany Brown',
      email: 'tbrown@jhu.edu'
    });
    let person8 = store.createRecord('person', {
      displayName: 'Hillary Peek',
      email: 'peek@jhu.edu'
    });
    let person9 = store.createRecord('person', {
      displayName: 'Steve Plimpton',
      email: 'plimpton@jhu.edu'
    });
    let person10 = store.createRecord('person', {
      displayName: 'Szu Wang',
      email: 'swang@jhu.edu'
    });
    let person11 = store.createRecord('person', {
      displayName: 'Kurt Sanders',
      email: 'sanders@jhu.edu'
    });
    let person12 = store.createRecord('person', {
      displayName: 'Robert Bradley',
      email: 'bradley@jhu.edu'
    });
    let person13= store.createRecord('person', {
      displayName: 'Erin Lewin',
      email: 'elewin@jhu.edu'
    });

    let grant1 = store.createRecord('grant', {
      awardNumber: 'R01EY027824',
      projectName: 'Regulation of blood-retinal barrier by placental growth factor.',
      startDate: new Date('2017-04-01'),
      endDate: new Date('2022-03-31'),
      awardStatus: 'Active',
      oapCompliance: 'No'
    });

    let grant2 = store.createRecord('grant', {
      awardNumber: 'R01DK110366',
      projectName: 'Identification and Activation Mechanisms of Vagal and Spinal Nociceptors in Esophageal Mucosa',
      startDate: new Date('2017-08-01'),
      endDate: new Date('2021-07-31'),
      awardStatus: 'Active',
      oapCompliance: 'No'
    });

    let grant3 = store.createRecord('grant', {
      projectName: 'Optimal magnification and oculomotor strategies in low vision patients',
      awardNumber: 'R01EY026617',
      startDate: new Date('2017-06-01'),
      endDate: new Date('2020-05-31'),
      awardStatus: 'Active',
      oapCompliance: 'No'
    });

    let grant4 = store.createRecord('grant', {
      projectName: 'UCure urethral strictures',
      awardNumber: '1640778',
      startDate: new Date('2016-06-01'),
      endDate: new Date('2017-12-31'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });

    let grant5 = store.createRecord('grant', {
      projectName: 'Psychiatric Epidemiology Training Program',
      awardNumber: 'T32MH014592',
      startDate: new Date('2016-07-01'),
      endDate: new Date('2017-06-30'),
      awardStatus: 'Terminated',
      oapCompliance: 'Yes'
    });

    let grant6 = store.createRecord('grant', {
      projectName: 'Neurologic Sequelae of HIV Subtype A and D Infection and ART Rakai Uganda',
      awardNumber: 'T32MH019545',
      startDate: new Date('2016-07-01'),
      endDate: new Date('2018-06-30'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant7 = store.createRecord('grant', {
      projectName: 'GEM:  RESPONSE OF GLOBAL IONOSPHERIC CURRENTS TO SUBSTORMS:  IMPLICATION FOR THE ELECTRIC FIELD PENETRATION TO THE INNER MAGNETOSPHERE',
      awardNumber: '1502700',
      startDate: new Date('2016-05-15'),
      endDate: new Date('2019-04-30'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });

    let grant8 = store.createRecord('grant', {
      projectName: 'Fogarty African Bioethics Consortium Post-Doctoral Fellowship Program',
      awardNumber: 'D43TW010512',
      startDate: new Date('2017-06-01'),
      endDate: new Date('2022-05-31'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant9 = store.createRecord('grant', {
      projectName: 'CAREER: DNA-Templated Assembly of Nanoscale Circuit Interconnects',
      awardNumber: 'CMMI-1253876',
      startDate: new Date('2013-01-01'),
      endDate: new Date('2017-12-31'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant10 = store.createRecord('grant', {
      projectName: 'Neurologic Sequelae of HIV Subtype A and D Infection and ART Rakai Uganda',
      awardNumber: 'R01MH099733',
      startDate: new Date('2016-03-01'),
      endDate: new Date('2018-02-28'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant11 = store.createRecord('grant', {
      projectName: 'Telomere maintenance by the telomerase RNA-protein complex',
      awardNumber: 'R01GM118757',
      startDate: new Date('2018-03-04'),
      endDate: new Date('2020-08-10'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant12 = store.createRecord('grant', {
      projectName: 'Genetics of Fuchs Corneal Dystrophy',
      awardNumber: 'R01EY016835',
      startDate: new Date('2017-03-04'),
      endDate: new Date('2018-08-10'),
      awardStatus: 'Active',
      oapCompliance: 'Yes'
    });
    let grant13 = store.createRecord('grant', {
      projectName: 'P-Adic and Mod P Galois Representations',
      awardNumber: '1564367',
      startDate: new Date('2015-03-04'),
      endDate: new Date('2017-08-10'),
      awardStatus: 'Terminated',
      oapCompliance: 'Yes'
    });

    let depositID1 = store.createRecord('identifier', {
      type: 'NIHMSID',
      label: '775054',
      uri: ''
    });

    let deposit1 = store.createRecord('deposit', {
      repository: 'PMC',
      updatedDate: new Date('2016-04-02'),
      status: 'Submitted'
    });

    let depositID2 = store.createRecord('identifier', {
      type: 'PARID',
      label: '32654',
      uri: ''
    });

    let deposit2 = store.createRecord('deposit', {
      repository: 'NSF-PAR',
      updatedDate: new Date('2015-05-02'),
      status: 'Submitted'
    });

    let depositID3 = store.createRecord('identifier', {
      type: 'PMCID',
      label: '659871',
      uri: ''
    });

    let deposit3 = store.createRecord('deposit', {
      repository: 'PMC',
      updatedDate: new Date('2017-05-02'),
      status: 'Submitted'
    });

    let depositID4 = store.createRecord('identifier', {
      type: 'PMCID',
      label: '9201038',
      uri: ''
    });

    let deposit4 = store.createRecord('deposit', {
      repository: 'PMC',
      updatedDate: new Date('2017-10-02'),
      status: 'Submitted'
    });

    let depositID5 = store.createRecord('identifier', {
      type: 'PMCID',
      label: '0982342',
      uri: ''
    });

    let deposit5 = store.createRecord('deposit', {
      repository: 'PMC',
      updatedDate: new Date('2016-10-02'),
      status: 'Submitted'
    });

    let sub1 = store.createRecord('submission', {
      title: 'Evaluating the Role of Interdigitated Neoadjuvant Chemotherapy and Radiation in the Management of High-Grade Soft-Tissue Sarcoma: The Johns Hopkins Experience.',
      creationDate: new Date('2016-04-04'),
      updatedDate: new Date('2016-05-04'),
      submittedDate: new Date('2017-07-04'),
      status: 'Submitted',
      corrAuthorName: 'Ernest Ford',
      corrAuthorEmail: 'ford@example.com'
    });

    let sub2 = store.createRecord('submission', {
      title: 'Micropattern size-dependent endothelial differentiation from a human induced pluripotent stem cell line.',
      creationDate: new Date('2017-06-02'),
      updatedDate: new Date('2017-12-04'),
      submittedDate: new Date('2017-12-04'),
      status: 'Submitted',
      corrAuthorName: 'Anne Gudzune',
      corrAuthorEmail: 'anne@example.com'
    });


    let sub3 = store.createRecord('submission', {
      title: 'Immunomodulatory Drugs: Immune Checkpoint Agents in Acute Leukemia.',
      creationDate: new Date('2017-06-02'),
      updatedDate: new Date('2017-11-04'),
      status: 'In Progress',
      corrAuthorName: 'Stephen Pillage',
      corrAuthorEmail: 'illage@example.com'
    });


    let sub4 = store.createRecord('submission', {
      title: 'Family history of alcoholism is related to increased D2 /D3 receptor binding potential: a marker of resilience or risk?',
      creationDate: new Date('2017-06-02'),
      updatedDate: new Date('2017-11-22'),
      status: 'In Progress',
      corrAuthorName: 'Eric Frey',
      corrAuthorEmail: 'frey@example.com'
    });

    let publisherA1 = store.createRecord('publisher', {
      name: 'American Chemical Society'
    })

    let publisherA2 = store.createRecord('publisher', {
      name: 'American Association of Pharmaceutical Scientists'
    })

    let publisherB1 = store.createRecord('publisher', {
      name: 'Royal Society of Chemistry'
    })

    let journalID1 = store.createRecord('identifier', {
      type: 'epub',
      label: 'ISSN',
      uri: '1550-7416'
    })

    let journalID2 = store.createRecord('identifier', {
      type: 'epub',
      label: 'ISSN',
      uri: '1948-5875'
    })

    let journalID3 = store.createRecord('identifier', {
      type: 'epub',
      label: 'ISSN',
      uri: '1522-1059'
    })

    let journalID4 = store.createRecord('identifier', {
      type: 'ppub',
      label: 'ISSN',
      uri: '2042-6496'
    })

    let journalID5 = store.createRecord('identifier', {
      type: 'epub',
      label: 'ISSN',
      uri: '2045-4538'
    })

    let journalID6 = store.createRecord('identifier', {
      type: 'ppub',
      label: 'ISSN',
      uri: '0003-2654'
    })

    let journalA1 = store.createRecord('journal', {
      name: 'AAPS Journal',
      nlmta: 'AAPS J',
      pmcParticipation: 'A'
    });

    let journalA2 = store.createRecord('journal', {
      name: 'ACS Medicinal Chemistry Letters',
      nlmta: 'ACS Med Chem Lett',
      pmcParticipation: 'A'
    });
    //test DOIs for article that was published by this journal
    // 10.1021/acsmedchemlett.7b00397
    // 10.1021/acsmedchemlett.7b00376

    let journalA3 = store.createRecord('journal', {
      name: 'AAPS PharmSci',
      nlmta: 'AAPS PharmSci',
      pmcParticipation: 'A'
    });

    let journalB1 = store.createRecord('journal', {
      name: 'Food & Function',
      nlmta: 'Food Funct',
      pmcParticipation: 'B'
    });
    //test DOIs for articles that were published by this journal
    // 10.1039/c7fo01251a
    // 10.1039/c7fo01382e


    let journalB2 = store.createRecord('journal', {
      name: 'Toxicology Research',
      nlmta: 'Toxicol Res',
      pmcParticipation: 'B'
    });

    let journalB3 = store.createRecord('journal', {
      name: 'Analyst',
      nlmta: 'Analyst',
      pmcParticipation: 'B'
    });
    //test DOIs for articles that were published by this journal
    // 10.1039/c7an01256j
    // 10.1039/C7AN01617D

    // Persist the test objects, add relationships, and then persist again.

    let objects = [user1, user2, user3, user4,
      funder1, funder2, funder3,
      grant1, grant2, grant3, grant4, grant5, grant6,
      grant7, grant8, grant9, grant10, grant11, grant12,
      depositID1, depositID2, depositID3, depositID4, depositID5,
      deposit1, deposit2, deposit3, deposit4, deposit5,
      sub1, sub2, sub3, sub4,
      coeus1, coeus2, coeus3, coeus4, coeus5, coeus6,
      coeus7, coeus8, coeus9, coeus12, coeus10, coeus11, coeus14,
      person1, person2, person3, person4, person5, person6, person7, person8,
      person9, person10,person11, person12, person13,
      journalA1, journalA2, journalA3, journalB1, journalB2, journalB3,
      journalID1, journalID2, journalID3, journalID4, journalID5, journalID6,
      publisherA1, publisherA2, publisherB1
  ];

    return RSVP.all(objects.map(o => o.save())).then(() => {
      grant1.set('creator', user2);
      grant2.set('creator', user2);
      grant3.set('creator', user3);
      grant4.set('creator', user1);
      grant5.set('creator', user4);
      grant6.set('creator', user3);
      grant7.set('creator', user1);
      grant8.set('creator', user2);
      grant9.set('creator', user3);
      grant10.set('creator', user1);
      grant11.set('creator', user3);
      grant13.set('creator', user2);
      grant12.set('creator', user3);

      grant1.set('directFunder', funder1);
      grant2.set('directFunder', funder3);
      grant3.set('directFunder', funder1);
      grant4.set('directFunder', funder2);
      grant5.set('directFunder', funder4);
      grant6.set('directFunder', funder5);
      grant7.set('directFunder', funder2);
      grant8.set('directFunder', funder5);
      grant9.set('directFunder', funder2);
      grant10.set('directFunder', funder5);
      grant11.set('directFunder', funder5);
      grant12.set('directFunder', funder1);
      grant13.set('directFunder', funder2);

      grant1.set('primaryFunder', funder1);
      grant2.set('primaryFunder', funder3);
      grant3.set('primaryFunder', funder1);
      grant4.set('primaryFunder', funder2);
      grant5.set('primaryFunder', funder4);
      grant6.set('primaryFunder', funder5);
      grant7.set('primaryFunder', funder2);
      grant8.set('primaryFunder', funder5);
      grant9.set('primaryFunder', funder2);
      grant10.set('primaryFunder', funder5);
      grant11.set('primaryFunder', funder5);
      grant12.set('primaryFunder', funder1);
      grant13.set('primaryFunder', funder2);

      grant1.set('localAwardId', coeus1);
      grant2.set('localAwardId', coeus2);
      grant3.set('localAwardId', coeus3);
      grant4.set('localAwardId', coeus4);
      grant5.set('localAwardId', coeus5);
      grant6.set('localAwardId', coeus6);
      grant7.set('localAwardId', coeus7);
      grant8.set('localAwardId', coeus8);
      grant9.set('localAwardId', coeus9);
      grant10.set('localAwardId', coeus10);
      grant11.set('localAwardId', coeus11);
      grant12.set('localAwardId', coeus12);
      grant13.set('localAwardId', coeus13);

      grant1.set('pi', person2);
      grant1.get('coPis').pushObject(person1);

      grant2.set('pi', person2);

      grant3.set('pi', person3);
      grant3.get('coPis').pushObject(person4);

      grant4.set('pi', person5);
      grant4.get('coPis').pushObject(person6);
      grant4.get('coPis').pushObject(person12);
      grant4.get('coPis').pushObject(person13);


      grant5.set('pi', person7);
      grant5.get('coPis').pushObject(person8);
      grant5.get('coPis').pushObject(person11);

      grant6.set('pi', person9);
      grant6.get('coPis').pushObject(person10);

      grant7.set('pi', person12);
      grant7.get('coPis').pushObject(person2);

      grant8.set('pi', person2);

      grant9.set('pi', person3);
      grant9.get('coPis').pushObject(person4);

      grant10.set('pi', person5);
      grant10.get('coPis').pushObject(person6);
      grant10.get('coPis').pushObject(person12);
      grant10.get('coPis').pushObject(person13);

      grant11.set('pi', person7);
      grant11.get('coPis').pushObject(person8);
      grant11.get('coPis').pushObject(person11);

      grant12.set('pi', person9);
      grant12.get('coPis').pushObject(person10);

      grant13.set('pi', person2);
      grant13.get('coPis').pushObject(person13);

      deposit1.set('assignedId', depositID1);
      deposit1.set('submission', sub1);

      deposit2.set('assignedId', depositID2);
      deposit2.set('submission', sub1);

      deposit3.set('assignedId', depositID3);
      deposit3.set('submission', sub2);

      deposit4.set('assignedId', depositID4);
      deposit4.set('submission', sub4);

      sub1.set('creator', user2);
      sub2.set('creator', user2);
      sub3.set('creator', user3);
      sub4.set('creator', user1);

      // sub1.set('author', person1);
      // sub2.set('author', person2);
      // sub3.set('author', person3);
      // sub4.set('author', person4);

      sub1.get('deposits').pushObject(deposit1);
      sub1.get('deposits').pushObject(deposit2);
      sub1.get('grants').pushObject(grant1);
      sub1.get('grants').pushObject(grant4);
      grant1.get('submissions').pushObject(sub1);

      sub2.get('deposits').pushObject(deposit3);
      grant1.get('submissions').pushObject(sub2);

      grant3.get('submissions').pushObject(sub3);
      grant4.get('submissions').pushObject(sub4);
      journalA1.get('ISSNs').pushObject(journalID1);
      journalA1.set('publisher', publisherA2);
      publisherA2.get('journals').pushObject(journalA1);

      journalA3.get('ISSNs').pushObject(journalID3);
      journalA3.set('publisher', publisherA2);
      publisherA2.get('journals').pushObject(journalA3);

      journalA2.get('ISSNs').pushObject(journalID2);
      journalA2.set('publisher', publisherA1);
      publisherA1.get('journals').pushObject(journalA2);

      journalB1.get('ISSNs').pushObject(journalID4);
      journalB1.set('publisher', publisherB1);
      publisherB1.get('journals').pushObject(journalB1);

      journalB2.get('ISSNs').pushObject(journalID5);
      journalB2.set('publisher', publisherB1);
      publisherB1.get('journals').pushObject(journalB2);

      journalB3.get('ISSNs').pushObject(journalID6);
      journalB3.set('publisher', publisherB1);
      publisherB1.get('journals').pushObject(journalB3);

      return RSVP.all(objects.map(o => o.save()));
    });
  }
});
