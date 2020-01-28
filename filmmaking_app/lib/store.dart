import 'dart:convert';
import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

enum Mode { None, Like, Dislike }

class Profile {
  String name;
  List<ImageData> images;
  Mode mode = Mode.None;

  Profile({this.name, this.images, this.mode});

  factory Profile.fromJson(Map<String, dynamic> parsedJson) {
    return Profile(
        name: parsedJson['name'],
        images: (parsedJson['images'] as List).map((image) => ImageData.fromJson(image)).toList(),
        mode: parsedJson['mode'] ?? Mode.None);
  }
}

class ImageData {
  String label;
  String src;

  ImageData(label, src) {
    this.label = label;
    this.src = 'assets/images/$src';
  }

  factory ImageData.fromJson(Map<String, dynamic> parsedJson) {
    return ImageData(parsedJson['label'], parsedJson['src']);
  }
}

class Store with ChangeNotifier {
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

    return true; // Add return false if the data read is invalid so the UI can inform of it
  }

  int get index => _index;

  set index(int value) {
    _index = min(_profiles.length - 1, max(0, value));
    notifyListeners();
  }

  Mode get mode => _profiles[_index].mode;

  set mode(Mode value) {
    _profiles[_index].mode = value == null ? Mode.None : value;
    notifyListeners();
  }

  List<ImageData> get images => _profiles[_index].images;

  String get name => _profiles[_index].name;
}
