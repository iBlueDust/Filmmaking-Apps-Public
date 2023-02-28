import 'dart:convert';
import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'classes.dart';

class Store with ChangeNotifier {
  bool _isInitialized = false;

  List<Profile> _profiles = [];
  int _index = 0;
  // List<ImageData> _images = [
  //   ImageData('Test 1', 'test_1.jpg'),
  //   ImageData('Test 2', 'test_2.jpg'),
  //   ImageData('Test 3', 'test_3.jpg')
  // ];

  Future<bool> init(BuildContext context) async {
    final jsonString = await DefaultAssetBundle.of(context).loadString('assets/data/profiles.json');
    List<dynamic> list = json.decode(jsonString);
    _profiles = list.map((profile) => Profile.fromJson(profile)).toList();

    _isInitialized = true;
    notifyListeners();

    return true; // Add return false if the data read is invalid so the UI can inform of it
  }

  bool get isInitialized => _isInitialized;

  bool get isIndexValid => _profiles.length >= 0 && _index >= 0 && _index < _profiles.length;

  int get index => _index;

  set index(int value) {
    _index = min(_profiles.length - 1, max(0, value));
    notifyListeners();
  }

  Mode get mode => isIndexValid ? _profiles[_index].mode : Mode.None;

  set mode(Mode value) {
    _profiles[_index].mode = value == null ? Mode.None : value;
    notifyListeners();
  }

  List<ImageData> get images => isIndexValid ? _profiles[_index].images : '';

  String get name => isIndexValid ? _profiles[_index].name : '';
}
